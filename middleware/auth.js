const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //get token from header
  const token = req.header("x-auth-token"); // this is the header key we wanna send the token in

  //check if no token
  if (!token) {
    return res.status(400).json({ msg: "no token, authorization denied" });
  }

  //verify token
  try {
    // if token is valid
    const decoded = jwt.verify(token, process.env.jwtSecret);

    req.user = decoded.user;
    next();
  } catch (err) {
    // if token is not valid
    res.status(401).json({ msg: "token not valid" });
  }
};
