const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/devrest", { useNewUrlParser: true });
mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;

module.exports = mongoose;
