function generateToken({ username }) {
  const { sign } = require('jsonwebtoken');

  let payLoad = {
    time: Date(),
    userName: username,
  };
  const token = sign(payLoad, process.env.JWT_SECRET_KEY);
  return token;
}

module.exports = {generateToken};
