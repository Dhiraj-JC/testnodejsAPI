function generateToken({ userName }) {
  const { sign } = require('jsonwebtoken');

  let payLoad = {
    userName: userName,
  };
  const token = sign(payLoad, process.env.JWT_SECRET_KEY, {
    expiresIn: '1d',
  });
  return token;
}

async function getHashedPassword(password) {
  const bcrypt = require('bcrypt');
  password = await bcrypt.hash(password, 10);
  return password;
}

module.exports = { generateToken, getHashedPassword };
