const User = require("../models/user");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  update,
  deleteUser
}

async function signup(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.pw, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function update(req, res) {
  try {
    // user's "old email" will be stored in JWT

    const user = await User.findOneAndUpdate({email: req.user.email}, req.body, {
      new: true // we want the updated user to update token
    });
    if (!user) return res.status(401).json({err: 'could not find user'});
    const token = createJWT(user);
    res.json({token});
  } catch (err) {
    return res.status(401).json(err);
  }

}

async function deleteUser(req, res) {
  try {
    const deleteComplete = await User.deleteOne({ email: req.user.email });
    res.status(200).json(deleteComplete);
  } catch (err) {
    return res.status(401).json(err);
  }
}

// Helper functions

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}
