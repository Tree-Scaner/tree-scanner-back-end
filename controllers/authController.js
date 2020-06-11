const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authconfig = require("../config/auth");

const User = require("../models/user");

const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign(params, authconfig.secret, {
    expiresIn: 2592000, // 30 Dias
  });
}

router.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    if (await User.findOne({ email })) {
      return res.status(400).send({ error: "Email já cadastrado" });
    }
    const user = await User.create(req.body);
    user.password = undefined;
    return res.send({
      user,
      token: generateToken({ id: user.id }),
    });
  } catch (error) {
    return res.status(400).send({ error: "Falha ao cadastrar" });
  }
});
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).send({ users });
  } catch (error) {
    return res.status(400).send({ error: "Falha ao buscar usuários" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) return res.status(400).send({ error: "Usuário nao encontrado" });

  if (!(await bcrypt.compare(password, user.password)))
    return res.status(400).send({ error: "Senha invalida" });

  user.password = undefined;

  res.send({
    user,
    token: generateToken({ id: user.id }),
  });
});

module.exports = (app) => app.use("/auth", router);
