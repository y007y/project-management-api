const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if (user.role === "admin") {
      next();
      return;
    }
    res.status(403).send({ message: "Require Admin Role!" });
  });
};

isManagerOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if (user.role === "manager" || user.role === "admin") {
      next();
      return;
    }
    res.status(403).send({ message: "Require Manager or Admin Role!" });
  });
};

isEmployeeOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if (user.role === "employee" || user.role === "admin") {
      next();
      return;
    }
    res.status(403).send({ message: "Require Employee or Admin Role!" });
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isManagerOrAdmin,
  isEmployeeOrAdmin
};
module.exports = authJwt;