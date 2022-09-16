const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EventTime'
  }]
}, { versionKey: false });

const eventTimeSchema = new Schema({
  title: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Quest'
  },
  eventTime: { type: Date },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
}, { versionKey: false });

const Quest = mongoose.model('Quest', questSchema);

const EventTime = mongoose.model('EventTime', eventTimeSchema);

module.exports = { Quest, EventTime };