const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const app = new express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

require("./controllers/authController")(app);
require("./controllers/controllerTree")(app);
require("./controllers/controllerSpecie")(app);

app.listen(3000);
