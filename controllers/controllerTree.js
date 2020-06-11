const express = require("express");

const tree = require("../models/Tree");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    await tree.create(req.body);
    return res.status(201).send("Árvore cadastrada com sucesso");
  } catch (err) {
    return res.status(400).send({ error: "Erro ao realizar cadastro", err });
  }
});

router.get("/", async (req, res) => {
  try {
    const list = await tree.find({});
    const result = { items: list, totalItems: list.length };
    return res.status(200).send({ ...result });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao buscar" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const items = await tree.findOne({ _id: req.params.id });
    return res.status(200).send({ items });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao buscar" });
  }
});

router.put("/", async (req, res) => {
  try {
    await tree.findOneAndUpdate(
      { _id: req.body._id },
      { ...req.body, updatedAt: new Date() }
    );
    return res.status(200).send("Cadastro alterado com sucesso");
  } catch (err) {
    return res.status(400).send({ error: "Erro ao buscar" });
  }
});

router.delete("/", async (req, res) => {
  try {
    await tree.findOneAndDelete({ _id: req.body._id });
    return res.status(204).send("Deletado com sucesso");
  } catch (error) {
    return res.status(400).send({ error: "Erro ao deletar" });
  }
});

module.exports = (app) => app.use("/tree", router);
