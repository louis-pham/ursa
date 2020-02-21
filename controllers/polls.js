const Poll = require("../models/poll");
const User = require("../models/user");

const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

module.exports = {
  create,
  getAllPolls,
  get,
  castVote,
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
  try {
    const poll = await Poll.findOne({_id: req.params.id}).populate("creator");
    if (!poll) return res.status(401).json({err: 'could not find poll'});
    const response = poll.choices.filter(choice => choice.responses.includes(req.user._id));
    const totalResponses = poll.choices.reduce((acc, choice) => acc + choice.responses.length, 0);
    console.log(totalResponses);
    res.status(200).json({poll, response, totalResponses});
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function castVote(req, res) {
  try {
    console.log("castVote");
    const poll = await Poll.findOne({_id: req.params.id});
    if (!poll) return res.status(401).json({err: 'could not find poll'});
    const response = poll.choices.filter(choice => choice.responses.includes(req.user._id));
    if (!response.length) {
      poll.choices.id(req.params.choiceId).responses.push(req.user._id);
      poll.save();
      res.status(200).json(poll);
    }
    res.status(401).json("Already voted");
  } catch (err) {
    res.status(401).json(err);
  }
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
