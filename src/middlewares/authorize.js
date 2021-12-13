const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const token = req.header("x-access-token");

  const jwtOptions = { issuer: process.env.ISSUER };
  jwt.verify(token, process.env.SECRET_KEY, jwtOptions, (err, payload) => {
    if (err) return res.status(403).json({ err });
    const { id, name, roles_id } = payload;
    req.userInfo = { id, name, roles_id };
    next();
  });
};

const authorizeAdminAndOwner = (req, res, next) => {
  const token = req.header("x-access-token");

  const jwtOptions = { issuer: process.env.ISSUER };
  jwt.verify(token, process.env.SECRET_KEY, jwtOptions, (err, payload) => {
    if (err)
      return res.status(403).json({ msg: "Silahkan login terlebih dahulu" });
    const { roles } = payload;
    if (roles == 1 || roles == 2) {
      req.payload = payload;
      return next();
    }
    res.status(403).json({ err: "Login kembali sebagai admin" });
  });
};

const authorizeAllUser = (req, res, next) => {
  const token = req.header("x-access-token");

  const jwtOptions = { issuer: process.env.ISSUER };
  jwt.verify(token, process.env.SECRET_KEY, jwtOptions, (err) => {
    if (err)
      return res.status(403).json({ msg: "Silahkan login terlebih dahulu" });
    next();
  });
};

module.exports = {
  checkToken,
  authorizeAdminAndOwner,
  authorizeAllUser,
};
