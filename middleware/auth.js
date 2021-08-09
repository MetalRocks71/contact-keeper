const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get the token from the header

  const token = req.header('x-auth-token');

  // check if not a token

  if (!token) {
    return res.status(401).json({ msg: 'No token. authorization denied.' });
  }

  // if there is token,

  try {
    const tokenDecoded = jwt.verify(token, config.get('jwtSecret'));

    // request the user that sign in with that in the payload
    req.user = tokenDecoded.user;
    next();
  } catch (err) {
    res.status(400).json({ msg: 'token is not valid.' });
  }
};
