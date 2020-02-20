const Poll = require("../models/poll");
const User = require("../models/user");

const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

module.exports = {
  create,
  getAllPolls,
  get,
  update,
  deletePoll
}

async function create(req, res) {
  const poll = new Poll(req.body);
  try {
    const user = await User.findOne({username: req.user.username}).select("id");
    if (!user) throw new Error("Could not create poll - no creator");
    poll.creator = user.id;
    await poll.save();
    res.status(200).json(poll);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getAllPolls(req, res) {
  try {
    const polls = await Poll.find({}).sort("-createdAt").populate("creator");
    if (!polls) return res.status(401).json({err: 'could not get polls'});
    res.status(200).json(polls);
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function get(req, res) {

}

async function update(req, res) {
  
}

async function deletePoll(req, res) {
  try {
    const deleteComplete = await Poll.deleteOne({ id: req.body.id });
    res.status(200).json(deleteComplete);
  } catch (err) {
    return res.status(401).json(err);
  }
}
