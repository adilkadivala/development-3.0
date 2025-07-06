const jwt = require("jsonwebtoken");
const z = require("zod");

const user_secret = process.env.JWT_SECRET_USER;

function userMiddleware(req, res, next) {
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
  const verifyUser = jwt.verify(token, user_secret);

  if (verifyUser) {
    req.userId = verifyUser.id;
    next();
  } else {
    res.status(403).json({ message: "You are not signed in" });
  }
}

module.exports = {
  userMiddleware,
};
