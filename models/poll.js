const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const choiceSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  responses: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

// const commentSchema = new mongoose.Schema({
//   content: {
//     type: String,
//     required: true
//   },
//   commenter: {
//     // ref
//   }
// });

const pollSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  choices: [choiceSchema],
  // comments: [commentSchema],
  // likes: {
  //  // array of ref
  // },
  // views: {
  //  // array of ref
  // },
  // location: {
  //   type: String
  // },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  time_limit: {
    type: mongoose.Date
  }
}, {
  timestamps: true
});


module.exports = mongoose.model('Poll', pollSchema);
