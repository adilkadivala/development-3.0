const jwt = require("jsonwebtoken");
const z = require("zod");
const admin_secret = process.env.JWT_SECRET_ADMIN;

function adminMiddleware(req, res, next) {
  const verifiedField = z.object({
    token: z.string(),
  });

  const verifiedData = verifiedField.safeParse(req.headers);

  if (!verifiedData.success) {
    res.json({
      messgage: "incorrect inputs",
      error: verifiedData.error.issues,
    });
    return;
  }

  const { token } = req.headers;
  const verifyAdmin = jwt.verify(token, admin_secret);

  if (verifyAdmin) {
    req.adminId = verifyAdmin.id;
    next();
  } else {
    res.status(403).json({ message: "You are not signed in" });
  }
}

module.exports = {
  adminMiddleware,
};
