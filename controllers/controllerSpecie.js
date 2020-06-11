const express = require("express");

const specie = require("../models/Specie");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    await specie.create(req.body);
    return res.status(201).send("Espécie cadastrada com sucesso");
  } catch (err) {
    return res.status(400).send({ error: "Erro ao realizar cadastro", err });
  }
});

router.get("/", async (req, res) => {
  try {
    const list = await specie.find({});
    return res.status(200).send({ list });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao buscar" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const list = await specie.find({ idEmpresa: req.query.id });
    return res.status(200).send({ list });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao buscar" });
  }
});

router.put("/", async (req, res) => {
  try {
    await specie.findOneAndUpdate({ _id: req.body._id }, req.body);
    return res.status(200).send("Cadastro alterado com sucesso");
  } catch (err) {
    return res.status(400).send({ error: "Erro ao buscar" });
  }
});

router.delete("/", async (req, res) => {
  try {
    await specie.findOneAndDelete({ _id: req.body._id });
    return res.status(204).send("Deletado com sucesso");
  } catch (error) {
    return res.status(400).send({ error: "Erro ao deletar" });
  }
});

module.exports = (app) => app.use("/specie", router);
