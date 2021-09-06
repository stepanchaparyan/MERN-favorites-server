const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  //Get token from header - Authorization: `Bearer ${token}
  const token = req.header('Authorization').split(' ')[1];

  // check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid Token' });
  }
};

module.exports = auth;
