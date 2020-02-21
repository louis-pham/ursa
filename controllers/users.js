const User = require("../models/user");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  update,
  deleteUser,
  get,
  getAllUsers
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
    const user = await User.findOne({username: req.body.username}).select("+password");
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

async function getAllUsers(req, res) {
  try {
    const users = await User.find({}).select("-email -_id"); // dont show private info of users
    console.log(users);
    if (!users) return res.status(401).json({err: 'could not get users'});
    res.status(200).json(users);
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function get(req, res) {
  try {
    const user = await User.findOne({username: req.params.username}).select("-email -_id");
    if (!user) return res.status(401).json({err: 'could not find user'});
    res.status(200).json(user);
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function update(req, res) {
  try {
    // user's "old username" will be stored in JWT
    if (req.body.password !== req.body.passwordConf) throw new Error("password validation failed");
    delete req.body.passwordConf;
    const user = await User.findOne({username: req.user.username}).select("+email +password");
    if (!user) return res.status(401).json({err: 'update failed: could not find user'});
    // can't use findOneAndUpdate since we cannot hook into the save middleware with it
    Object.keys(req.body).forEach(key => {
      if (user[key] !== req.body[key]) user[key] = req.body[key];
    });
    await user.save();
    const token = createJWT(user);
    res.json({token});
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function deleteUser(req, res) {
  try {
    const deleteComplete = await User.deleteOne({ username: req.user.username });
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
