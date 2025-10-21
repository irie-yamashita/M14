import express from 'express';
import { readData, writeData } from "../controllers/db.controller.js";


const router = express.Router();


// GET /trees
router.get("/", (req, res) => {
  const data = readData();
  res.render("trees", { data });
});

// GET flor by id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const data = readData();
  const dataTree = data.trees.find((tree) => tree.id == id);

  if (!dataTree) {
    return res.status(404).json({ error: `Arbre amb ID ${id} no trobada!` });
  }

  res.render("detail-plant", {data: dataTree})
});

// POST /trees
router.post("/", (req, res) => {
  const data = readData();
  const body = req.body;

  // Crear nova planta amb ID incremental
  const newId = data.trees[data.trees.length - 1]
    ? parseInt(data.trees[data.trees.length - 1].id) + 2
    : 2;

  const newPlant = {
    id: newId,
    name: body.name || "",
    category: body.category || "",
    bloomSeason: body.bloomSeason || "",
    origin: body.origin || "",
    description: body.description || "",
    type: body.type || "arbre", // per indicar si és flor o arbre
  };

  data.trees.push(newPlant);
  writeData(data);

  res.status(201).json(newPlant);
});


// PUT /trees/:id
router.put("/:id", (req, res) => {
  const data = readData();
  const body = req.body;
  const id = parseInt(req.params.id);

  const treeIndex = data.trees.findIndex((flower) => flower.id === id);

  if (treeIndex === -1) {
    return res.status(404).json({ error: "Arbre no trobat" });
  }

  // Actualitzem només els camps enviats
  data.trees[treeIndex] = {
    ...data.trees[treeIndex],
    ...body,
  };

  writeData(data);

  res.json({ message: "Arbre actualitzat correctament" });
});

// DELETE /trees/:id
router.delete("/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const treeIndex = data.trees.findIndex((tree) => tree.id === id);

  if (treeIndex === -1) {
    return res.status(404).json({ message: "Arbre no trobat " });
  }

  data.trees.splice(treeIndex, 1);
  writeData(data);
  res.json({ message: "Arbre eliminat correctamente" });
});

export default router;
