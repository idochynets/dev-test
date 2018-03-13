'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
mongoose.Promise = Promise;

let HouseSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    type: String,
    colour: String,
    owner:{type: Schema.Types.ObjectId, ref: "Person"}
}, {
  usePushEach: true
});

module.exports = mongoose.model('House', HouseSchema);
