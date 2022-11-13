const authenticateRouter = require('express').Router();
const User = require('../models/user');
const { generateToken } = require('../utilities');

authenticateRouter.post('/login', async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await User.findOne({ username: userName, password: password });

    if (!user) {
      res.status(400).json({
        error: 'Username and password is incorrect',
      });
    } else {
      const token = generateToken(user);
      res.json({ token });
    }
  } catch (err) {
    res.status(500).send(err.message || err);
  }
});

authenticateRouter.post('/signup', async (req, res) => {
  const { userName, password } = req.body;
  const userEntity = new User({ userName: userName, password: password });

  try {
    await userEntity.save();

    const token = generateToken(userEntity);
    res.json({ token });
  } catch (err) {
    res.status(500).send(err.message || err);
  }
});

module.exports = authenticateRouter;
