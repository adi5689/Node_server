// middleware/roleCheck.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const roleCheck = (roles) => {
 return async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ where: { id: decoded.id } });
      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      if (roles.includes(user.role)) {
        next();
      } else {
        res.status(403).json({ error: "Forbidden" });
      }
    } catch (err) {
      res.status(401).json({ error: "Unauthorized" });
    }
 };
};

module.exports = { roleCheck };
