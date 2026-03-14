import bcrypt from "bcryptjs";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET environment variable");
}

function parsePositiveNumber(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return null;
  }
  return parsed;
}

function parseDate(value) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }
  return parsed;
}

function getLaunchStatus(launch, totalPurchased) {
  const now = Date.now();
  const startsAtMs = new Date(launch.startsAt).getTime();
  const endsAtMs = new Date(launch.endsAt).getTime();

  if (totalPurchased >= launch.totalSupply) {
    return "SOLD_OUT";
  }
  if (now < startsAtMs) {
    return "UPCOMING";
  }
  if (now > endsAtMs) {
    return "ENDED";
  }
  return "ACTIVE";
}

function computeTieredCost(amount, tiers, fallbackPricePerToken) {
  if (!tiers || tiers.length === 0) {
    return amount * fallbackPricePerToken;
  }

  let remaining = amount;
  let totalCost = 0;

  for (const tier of tiers) {
    if (remaining <= 0) {
      break;
    }

    const capacity = Math.max(0, tier.maxAmount - tier.minAmount);
    if (capacity <= 0) {
      continue;
    }

    const usedInTier = Math.min(remaining, capacity);
    totalCost += usedInTier * tier.pricePerToken;
    remaining -= usedInTier;
  }

  if (remaining > 0) {
    totalCost += remaining * fallbackPricePerToken;
  }

  return totalCost;
}

function signToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    return next();
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

async function getPurchasedTotalsByLaunchIds(launchIds) {
  if (launchIds.length === 0) {
    return new Map();
  }

  const grouped = await prisma.purchase.groupBy({
    by: ["launchId"],
    where: { launchId: { in: launchIds } },
    _sum: { amount: true }
  });

  const totals = new Map();
  for (const item of grouped) {
    totals.set(item.launchId, item._sum.amount ?? 0);
  }

  return totals;
}

function serializeLaunch(launch, totalPurchased) {
  return {
    ...launch,
    totalPurchased,
    status: getLaunchStatus(launch, totalPurchased)
  };
}

app.get("/api/health", (_req, res) => {
  return res.status(200).json({ status: "ok" });
});

app.post("/api/auth/register", async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name }
    });

    const token = signToken(user.id);

    return res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    return next(error);
  }
});

app.post("/api/auth/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signToken(user.id);

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    return next(error);
  }
});

app.post("/api/launches", authMiddleware, async (req, res, next) => {
  try {
    const {
      name,
      symbol,
      totalSupply,
      pricePerToken,
      startsAt,
      endsAt,
      maxPerWallet,
      description,
      tiers,
      vesting
    } = req.body;

    if (
      !name ||
      !symbol ||
      totalSupply === undefined ||
      pricePerToken === undefined ||
      !startsAt ||
      !endsAt ||
      maxPerWallet === undefined ||
      !description
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const parsedTotalSupply = parsePositiveNumber(totalSupply);
    const parsedPricePerToken = parsePositiveNumber(pricePerToken);
    const parsedMaxPerWallet = parsePositiveNumber(maxPerWallet);
    const parsedStartsAt = parseDate(startsAt);
    const parsedEndsAt = parseDate(endsAt);

    if (
      !parsedTotalSupply ||
      !parsedPricePerToken ||
      !parsedMaxPerWallet ||
      !parsedStartsAt ||
      !parsedEndsAt ||
      parsedEndsAt <= parsedStartsAt
    ) {
      return res.status(400).json({ error: "Invalid launch fields" });
    }

    let tierRows = [];
    if (tiers !== undefined) {
      if (!Array.isArray(tiers)) {
        return res.status(400).json({ error: "tiers must be an array" });
      }

      tierRows = tiers.map((tier, index) => {
        const minAmount = Number(tier.minAmount);
        const maxAmount = Number(tier.maxAmount);
        const tierPrice = Number(tier.pricePerToken);
        if (
          !Number.isFinite(minAmount) ||
          !Number.isFinite(maxAmount) ||
          !Number.isFinite(tierPrice) ||
          maxAmount <= minAmount ||
          tierPrice <= 0
        ) {
          return null;
        }

        return {
          minAmount,
          maxAmount,
          pricePerToken: tierPrice,
          sortOrder: index
        };
      });

      if (tierRows.some((tier) => tier === null)) {
        return res.status(400).json({ error: "Invalid tier configuration" });
      }
    }

    let vestingRow;
    if (vesting !== undefined) {
      const cliffDays = Number(vesting.cliffDays);
      const vestingDays = Number(vesting.vestingDays);
      const tgePercent = Number(vesting.tgePercent);

      if (
        !Number.isInteger(cliffDays) ||
        cliffDays < 0 ||
        !Number.isInteger(vestingDays) ||
        vestingDays < 0 ||
        !Number.isFinite(tgePercent) ||
        tgePercent < 0 ||
        tgePercent > 100
      ) {
        return res.status(400).json({ error: "Invalid vesting configuration" });
      }

      vestingRow = {
        cliffDays,
        vestingDays,
        tgePercent: Math.floor(tgePercent)
      };
    }

    const launch = await prisma.launch.create({
      data: {
        name,
        symbol,
        totalSupply: parsedTotalSupply,
        pricePerToken: parsedPricePerToken,
        startsAt: parsedStartsAt,
        endsAt: parsedEndsAt,
        maxPerWallet: parsedMaxPerWallet,
        description,
        creatorId: req.userId,
        tiers: tierRows.length > 0 ? { create: tierRows } : undefined,
        vesting: vestingRow ? { create: vestingRow } : undefined
      },
      include: {
        tiers: { orderBy: { sortOrder: "asc" } },
        vesting: true
      }
    });

    return res.status(201).json(serializeLaunch(launch, 0));
  } catch (error) {
    return next(error);
  }
});

app.get("/api/launches", async (req, res, next) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Number(req.query.limit) || 10);
    const statusFilter = req.query.status;

    const launches = await prisma.launch.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        tiers: { orderBy: { sortOrder: "asc" } },
        vesting: true
      }
    });

    const totals = await getPurchasedTotalsByLaunchIds(launches.map((launch) => launch.id));

    let formatted = launches.map((launch) => {
      const totalPurchased = totals.get(launch.id) ?? 0;
      return serializeLaunch(launch, totalPurchased);
    });

    if (statusFilter) {
      formatted = formatted.filter((launch) => launch.status === statusFilter);
    }

    const total = formatted.length;
    const offset = (page - 1) * limit;
    const paginated = formatted.slice(offset, offset + limit);

    return res.status(200).json({
      launches: paginated,
      total,
      page,
      limit
    });
  } catch (error) {
    return next(error);
  }
});

app.get("/api/launches/:id", async (req, res, next) => {
  try {
    const launchId = Number(req.params.id);
    if (!Number.isInteger(launchId)) {
      return res.status(404).json({ error: "Launch not found" });
    }

    const launch = await prisma.launch.findUnique({
      where: { id: launchId },
      include: {
        tiers: { orderBy: { sortOrder: "asc" } },
        vesting: true
      }
    });

    if (!launch) {
      return res.status(404).json({ error: "Launch not found" });
    }

    const purchased = await prisma.purchase.aggregate({
      where: { launchId },
      _sum: { amount: true }
    });

    return res.status(200).json(serializeLaunch(launch, purchased._sum.amount ?? 0));
  } catch (error) {
    return next(error);
  }
});

app.put("/api/launches/:id", authMiddleware, async (req, res, next) => {
  try {
    const launchId = Number(req.params.id);
    if (!Number.isInteger(launchId)) {
      return res.status(404).json({ error: "Launch not found" });
    }

    const existing = await prisma.launch.findUnique({ where: { id: launchId } });
    if (!existing) {
      return res.status(404).json({ error: "Launch not found" });
    }

    if (existing.creatorId !== req.userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const data = {};

    if (req.body.name !== undefined) {
      data.name = req.body.name;
    }
    if (req.body.symbol !== undefined) {
      data.symbol = req.body.symbol;
    }
    if (req.body.description !== undefined) {
      data.description = req.body.description;
    }
    if (req.body.totalSupply !== undefined) {
      const parsed = parsePositiveNumber(req.body.totalSupply);
      if (!parsed) {
        return res.status(400).json({ error: "Invalid totalSupply" });
      }
      data.totalSupply = parsed;
    }
    if (req.body.pricePerToken !== undefined) {
      const parsed = parsePositiveNumber(req.body.pricePerToken);
      if (!parsed) {
        return res.status(400).json({ error: "Invalid pricePerToken" });
      }
      data.pricePerToken = parsed;
    }
    if (req.body.maxPerWallet !== undefined) {
      const parsed = parsePositiveNumber(req.body.maxPerWallet);
      if (!parsed) {
        return res.status(400).json({ error: "Invalid maxPerWallet" });
      }
      data.maxPerWallet = parsed;
    }

    let startsAt = existing.startsAt;
    let endsAt = existing.endsAt;

    if (req.body.startsAt !== undefined) {
      const parsed = parseDate(req.body.startsAt);
      if (!parsed) {
        return res.status(400).json({ error: "Invalid startsAt" });
      }
      startsAt = parsed;
      data.startsAt = parsed;
    }
    if (req.body.endsAt !== undefined) {
      const parsed = parseDate(req.body.endsAt);
      if (!parsed) {
        return res.status(400).json({ error: "Invalid endsAt" });
      }
      endsAt = parsed;
      data.endsAt = parsed;
    }

    if (new Date(endsAt) <= new Date(startsAt)) {
      return res.status(400).json({ error: "endsAt must be after startsAt" });
    }

    if (req.body.tiers !== undefined && !Array.isArray(req.body.tiers)) {
      return res.status(400).json({ error: "tiers must be an array" });
    }

    if (req.body.vesting !== undefined && req.body.vesting !== null) {
      const cliffDays = Number(req.body.vesting.cliffDays);
      const vestingDays = Number(req.body.vesting.vestingDays);
      const tgePercent = Number(req.body.vesting.tgePercent);

      if (
        !Number.isInteger(cliffDays) ||
        cliffDays < 0 ||
        !Number.isInteger(vestingDays) ||
        vestingDays < 0 ||
        !Number.isFinite(tgePercent) ||
        tgePercent < 0 ||
        tgePercent > 100
      ) {
        return res.status(400).json({ error: "Invalid vesting configuration" });
      }
    }

    await prisma.$transaction(async (tx) => {
      await tx.launch.update({ where: { id: launchId }, data });

      if (req.body.tiers !== undefined) {
        const mapped = req.body.tiers.map((tier, index) => {
          const minAmount = Number(tier.minAmount);
          const maxAmount = Number(tier.maxAmount);
          const pricePerToken = Number(tier.pricePerToken);

          if (
            !Number.isFinite(minAmount) ||
            !Number.isFinite(maxAmount) ||
            !Number.isFinite(pricePerToken) ||
            maxAmount <= minAmount ||
            pricePerToken <= 0
          ) {
            throw new Error("INVALID_TIERS");
          }

          return {
            launchId,
            minAmount,
            maxAmount,
            pricePerToken,
            sortOrder: index
          };
        });

        await tx.tier.deleteMany({ where: { launchId } });
        if (mapped.length > 0) {
          await tx.tier.createMany({ data: mapped });
        }
      }

      if (req.body.vesting !== undefined) {
        if (req.body.vesting === null) {
          await tx.vestingConfig.deleteMany({ where: { launchId } });
        } else {
          const cliffDays = Number(req.body.vesting.cliffDays);
          const vestingDays = Number(req.body.vesting.vestingDays);
          const tgePercent = Math.floor(Number(req.body.vesting.tgePercent));

          await tx.vestingConfig.upsert({
            where: { launchId },
            update: { cliffDays, vestingDays, tgePercent },
            create: { launchId, cliffDays, vestingDays, tgePercent }
          });
        }
      }
    });

    const launch = await prisma.launch.findUnique({
      where: { id: launchId },
      include: {
        tiers: { orderBy: { sortOrder: "asc" } },
        vesting: true
      }
    });

    const purchased = await prisma.purchase.aggregate({
      where: { launchId },
      _sum: { amount: true }
    });

    return res.status(200).json(serializeLaunch(launch, purchased._sum.amount ?? 0));
  } catch (error) {
    if (error.message === "INVALID_TIERS") {
      return res.status(400).json({ error: "Invalid tier configuration" });
    }
    return next(error);
  }
});

app.post("/api/launches/:id/whitelist", authMiddleware, async (req, res, next) => {
  try {
    const launchId = Number(req.params.id);
    const addresses = req.body.addresses;

    if (!Number.isInteger(launchId)) {
      return res.status(404).json({ error: "Launch not found" });
    }

    if (!Array.isArray(addresses)) {
      return res.status(400).json({ error: "addresses must be an array" });
    }

    const launch = await prisma.launch.findUnique({ where: { id: launchId } });
    if (!launch) {
      return res.status(404).json({ error: "Launch not found" });
    }

    if (launch.creatorId !== req.userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const cleaned = [...new Set(addresses.map((address) => String(address).trim()).filter(Boolean))];

    let added = 0;
    if (cleaned.length > 0) {
      const result = await prisma.whitelistAddress.createMany({
        data: cleaned.map((address) => ({ launchId, address })),
        skipDuplicates: true
      });
      added = result.count;
    }

    const total = await prisma.whitelistAddress.count({ where: { launchId } });

    return res.status(200).json({ added, total });
  } catch (error) {
    return next(error);
  }
});

app.get("/api/launches/:id/whitelist", authMiddleware, async (req, res, next) => {
  try {
    const launchId = Number(req.params.id);
    if (!Number.isInteger(launchId)) {
      return res.status(404).json({ error: "Launch not found" });
    }

    const launch = await prisma.launch.findUnique({ where: { id: launchId } });
    if (!launch) {
      return res.status(404).json({ error: "Launch not found" });
    }

    if (launch.creatorId !== req.userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const rows = await prisma.whitelistAddress.findMany({
      where: { launchId },
      orderBy: { createdAt: "asc" }
    });

    const addresses = rows.map((row) => row.address);
    return res.status(200).json({ addresses, total: addresses.length });
  } catch (error) {
    return next(error);
  }
});

app.delete("/api/launches/:id/whitelist/:address", authMiddleware, async (req, res, next) => {
  try {
    const launchId = Number(req.params.id);
    const address = decodeURIComponent(req.params.address);

    if (!Number.isInteger(launchId)) {
      return res.status(404).json({ error: "Launch not found" });
    }

    const launch = await prisma.launch.findUnique({ where: { id: launchId } });
    if (!launch) {
      return res.status(404).json({ error: "Launch not found" });
    }

    if (launch.creatorId !== req.userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const existing = await prisma.whitelistAddress.findUnique({
      where: {
        launchId_address: {
          launchId,
          address
        }
      }
    });

    if (!existing) {
      return res.status(404).json({ error: "Address not found" });
    }

    await prisma.whitelistAddress.delete({ where: { id: existing.id } });
    return res.status(200).json({ removed: true });
  } catch (error) {
    return next(error);
  }
});

app.post("/api/launches/:id/referrals", authMiddleware, async (req, res, next) => {
  try {
    const launchId = Number(req.params.id);
    const { code, discountPercent, maxUses } = req.body;

    if (!Number.isInteger(launchId)) {
      return res.status(404).json({ error: "Launch not found" });
    }

    if (!code || discountPercent === undefined || maxUses === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const parsedDiscount = Number(discountPercent);
    const parsedMaxUses = Number(maxUses);

    if (
      !Number.isFinite(parsedDiscount) ||
      parsedDiscount < 0 ||
      parsedDiscount > 100 ||
      !Number.isInteger(parsedMaxUses) ||
      parsedMaxUses <= 0
    ) {
      return res.status(400).json({ error: "Invalid referral fields" });
    }

    const launch = await prisma.launch.findUnique({ where: { id: launchId } });
    if (!launch) {
      return res.status(404).json({ error: "Launch not found" });
    }

    if (launch.creatorId !== req.userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    try {
      const referral = await prisma.referralCode.create({
        data: {
          launchId,
          code: String(code).trim(),
          discountPercent: parsedDiscount,
          maxUses: parsedMaxUses
        }
      });

      return res.status(201).json({
        id: referral.id,
        code: referral.code,
        discountPercent: referral.discountPercent,
        maxUses: referral.maxUses,
        usedCount: referral.usedCount
      });
    } catch (error) {
      if (error.code === "P2002") {
        return res.status(409).json({ error: "Referral code already exists for this launch" });
      }
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});

app.get("/api/launches/:id/referrals", authMiddleware, async (req, res, next) => {
  try {
    const launchId = Number(req.params.id);
    if (!Number.isInteger(launchId)) {
      return res.status(404).json({ error: "Launch not found" });
    }

    const launch = await prisma.launch.findUnique({ where: { id: launchId } });
    if (!launch) {
      return res.status(404).json({ error: "Launch not found" });
    }

    if (launch.creatorId !== req.userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const referrals = await prisma.referralCode.findMany({
      where: { launchId },
      orderBy: { createdAt: "asc" }
    });

    return res.status(200).json(
      referrals.map((referral) => ({
        id: referral.id,
        code: referral.code,
        discountPercent: referral.discountPercent,
        maxUses: referral.maxUses,
        usedCount: referral.usedCount
      }))
    );
  } catch (error) {
    return next(error);
  }
});

app.post("/api/launches/:id/purchase", authMiddleware, async (req, res, next) => {
  try {
    const launchId = Number(req.params.id);
    const { walletAddress, amount, txSignature, referralCode } = req.body;

    if (!Number.isInteger(launchId)) {
      return res.status(404).json({ error: "Launch not found" });
    }

    const parsedAmount = parsePositiveNumber(amount);
    if (!walletAddress || !parsedAmount || !txSignature) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const launch = await prisma.launch.findUnique({
      where: { id: launchId },
      include: {
        tiers: { orderBy: { sortOrder: "asc" } }
      }
    });

    if (!launch) {
      return res.status(404).json({ error: "Launch not found" });
    }

    const [launchPurchasedAgg, userPurchasedAgg, whitelistCount] = await Promise.all([
      prisma.purchase.aggregate({
        where: { launchId },
        _sum: { amount: true }
      }),
      prisma.purchase.aggregate({
        where: { launchId, userId: req.userId },
        _sum: { amount: true }
      }),
      prisma.whitelistAddress.count({ where: { launchId } })
    ]);

    const launchPurchased = launchPurchasedAgg._sum.amount ?? 0;
    const userPurchased = userPurchasedAgg._sum.amount ?? 0;

    const status = getLaunchStatus(launch, launchPurchased);
    if (status !== "ACTIVE") {
      return res.status(400).json({ error: "Launch is not ACTIVE" });
    }

    if (whitelistCount > 0) {
      const allowed = await prisma.whitelistAddress.findUnique({
        where: {
          launchId_address: {
            launchId,
            address: walletAddress
          }
        }
      });

      if (!allowed) {
        return res.status(400).json({ error: "Wallet is not whitelisted" });
      }
    }

    if (userPurchased + parsedAmount > launch.maxPerWallet) {
      return res.status(400).json({ error: "Exceeds maxPerWallet per user" });
    }

    if (launchPurchased + parsedAmount > launch.totalSupply) {
      return res.status(400).json({ error: "Exceeds totalSupply" });
    }

    const existingTx = await prisma.purchase.findUnique({ where: { txSignature } });
    if (existingTx) {
      return res.status(400).json({ error: "Duplicate txSignature" });
    }

    let referral = null;
    if (referralCode !== undefined) {
      referral = await prisma.referralCode.findUnique({
        where: {
          launchId_code: {
            launchId,
            code: referralCode
          }
        }
      });

      if (!referral || referral.usedCount >= referral.maxUses) {
        return res.status(400).json({ error: "Invalid or exhausted referral code" });
      }
    }

    const rawTotalCost = computeTieredCost(parsedAmount, launch.tiers, launch.pricePerToken);
    const finalTotalCost = referral
      ? rawTotalCost * (1 - referral.discountPercent / 100)
      : rawTotalCost;

    const purchase = await prisma.$transaction(async (tx) => {
      let referralCodeId = null;

      if (referral) {
        const latest = await tx.referralCode.findUnique({ where: { id: referral.id } });
        if (!latest || latest.usedCount >= latest.maxUses) {
          throw new Error("INVALID_REFERRAL");
        }

        await tx.referralCode.update({
          where: { id: latest.id },
          data: { usedCount: { increment: 1 } }
        });
        referralCodeId = latest.id;
      }

      return tx.purchase.create({
        data: {
          launchId,
          userId: req.userId,
          walletAddress,
          amount: parsedAmount,
          totalCost: finalTotalCost,
          txSignature,
          referralCodeId
        }
      });
    });

    return res.status(201).json({
      ...purchase,
      totalCost: purchase.totalCost
    });
  } catch (error) {
    if (error.message === "INVALID_REFERRAL") {
      return res.status(400).json({ error: "Invalid or exhausted referral code" });
    }

    if (error.code === "P2002") {
      return res.status(400).json({ error: "Duplicate txSignature" });
    }

    return next(error);
  }
});

app.get("/api/launches/:id/purchases", authMiddleware, async (req, res, next) => {
  try {
    const launchId = Number(req.params.id);
    if (!Number.isInteger(launchId)) {
      return res.status(404).json({ error: "Launch not found" });
    }

    const launch = await prisma.launch.findUnique({ where: { id: launchId } });
    if (!launch) {
      return res.status(404).json({ error: "Launch not found" });
    }

    const where = { launchId };
    if (launch.creatorId !== req.userId) {
      where.userId = req.userId;
    }

    const purchases = await prisma.purchase.findMany({
      where,
      orderBy: { createdAt: "desc" }
    });

    return res.status(200).json({ purchases, total: purchases.length });
  } catch (error) {
    return next(error);
  }
});

app.get("/api/launches/:id/vesting", async (req, res, next) => {
  try {
    const launchId = Number(req.params.id);
    const walletAddress = req.query.walletAddress;

    if (!Number.isInteger(launchId)) {
      return res.status(404).json({ error: "Launch not found" });
    }

    if (!walletAddress) {
      return res.status(400).json({ error: "walletAddress is required" });
    }

    const launch = await prisma.launch.findUnique({
      where: { id: launchId },
      include: { vesting: true }
    });

    if (!launch) {
      return res.status(404).json({ error: "Launch not found" });
    }

    const purchased = await prisma.purchase.aggregate({
      where: { launchId, walletAddress: String(walletAddress) },
      _sum: { amount: true }
    });

    const totalPurchased = Math.floor(purchased._sum.amount ?? 0);

    if (!launch.vesting) {
      return res.status(200).json({
        totalPurchased,
        tgeAmount: totalPurchased,
        cliffEndsAt: null,
        vestedAmount: totalPurchased,
        lockedAmount: 0,
        claimableAmount: totalPurchased
      });
    }

    const msPerDay = 24 * 60 * 60 * 1000;
    const now = Date.now();
    const startsAtMs = new Date(launch.startsAt).getTime();
    const cliffEndsAtMs = startsAtMs + launch.vesting.cliffDays * msPerDay;
    const vestingDurationMs = launch.vesting.vestingDays * msPerDay;

    const tgeAmount = Math.floor((totalPurchased * launch.vesting.tgePercent) / 100);
    const remainingAfterTge = Math.max(0, totalPurchased - tgeAmount);

    let vestedAmount = 0;
    if (now >= startsAtMs) {
      vestedAmount = tgeAmount;

      if (now >= cliffEndsAtMs) {
        if (vestingDurationMs <= 0) {
          vestedAmount = totalPurchased;
        } else {
          const elapsed = Math.min(vestingDurationMs, now - cliffEndsAtMs);
          const linearUnlocked = Math.floor((remainingAfterTge * elapsed) / vestingDurationMs);
          vestedAmount = Math.min(totalPurchased, tgeAmount + linearUnlocked);
        }
      }
    }

    const lockedAmount = Math.max(0, totalPurchased - vestedAmount);
    const claimableAmount = vestedAmount;

    return res.status(200).json({
      totalPurchased,
      tgeAmount,
      cliffEndsAt: new Date(cliffEndsAtMs).toISOString(),
      vestedAmount,
      lockedAmount,
      claimableAmount
    });
  } catch (error) {
    return next(error);
  }
});

app.use((err, _req, res, _next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  return res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});
