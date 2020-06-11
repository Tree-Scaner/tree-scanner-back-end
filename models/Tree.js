const mongoose = require("../database");
const bcrypt = require("bcryptjs");

const TreeSchema = new mongoose.Schema({
  registerBy: {
    type: String,
    require: false,
  },
  dateNextPrunning: {
    type: Date,
    required: false,
  },
  dateLastPrunning: {
    type: Date,
    required: false,
  },
  treeAge: {
    type: Number,
    required: false,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  specie: {
    // type: mongoose.Schema.Types.ObjectId,
    type: Number,
    required: true,
  },
  specieStatus: {
    type: Number,
  },
  typePrunning: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

const Tree = mongoose.model("Tree", TreeSchema);

module.exports = Tree;
