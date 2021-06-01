const jwt = require('jsonwebtoken');

const validateUserBody = (req, res, next) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: 'Username or password invalid' });
    }
  
    next();
  };

  const restrict = (req, res, next) => {
    const token  = req.headers.authorization;
    if (!token) {
      res.status(401).json({ message: "Token required." });
    } else {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Token invalid." });
        }
        console.log("decoded: ", decoded);
        req.decoded = decoded;
        next();
      });
    }
  };
  
  
  module.exports = { validateUserBody ,restrict};