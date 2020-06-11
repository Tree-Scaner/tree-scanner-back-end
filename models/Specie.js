const mongoose = require("../database");
const bcrypt = require("bcryptjs");

const SpecieSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Specie = mongoose.model("Specie", SpecieSchema);

module.exports = Specie;
