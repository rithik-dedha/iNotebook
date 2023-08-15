const jwt = require("jsonwebtoken");
const JWT_SECRET =
  "This world is a fucking bitch, you need to be a bitch too. Be the biggest bitch you can be. Fuck all.";

const fetchuser = (req, res, next) => {
  // get user from the JWT token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "please authenticate using valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "please authenticate using valid token" });
  }
};
module.exports = fetchuser;
