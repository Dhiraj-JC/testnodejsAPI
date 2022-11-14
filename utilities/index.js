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
  const bcrypt = require("bcrypt");
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  return password;
}

module.exports = { generateToken,getHashedPassword };
