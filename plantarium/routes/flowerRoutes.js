import express from "express";
import { readData, writeData } from "../controllers/db.controller.js";

const router = express.Router();

// GET /flors
router.get("/", (req, res) => {
  const data = readData();
  res.render("flowers", { data });
});

// GET flor by id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const data = readData();
  const dataFlower = data.flowers.find((flower) => flower.id == id);

  if (!dataFlower) {
    return res.status(404).json({ error: `Flor amb ID ${id} no trobada!` });
  }

  res.render("detail-plant", {data: dataFlower});
});

// POST /flors
router.post("/", (req, res) => {
  const data = readData();
  const body = req.body;

  // Crear nova planta amb ID incremental
  const newId = data.flowers[data.flowers.length - 1]
    ? parseInt(data.flowers[data.flowers.length - 1].id) + 2
    : 1;

  const newPlant = {
    id: newId,
    name: body.name || "",
    category: body.category || "",
    bloomSeason: body.bloomSeason || "",
    origin: body.origin || "",
    description: body.description || "",
    type: body.type || "flor", // per indicar si és flor o arbre
  };

  data.flowers.push(newPlant);
  writeData(data);

  res.status(201).json(newPlant);
});

// PUT /flors/:id
router.put("/:id", (req, res) => {
  const data = readData();
  const body = req.body;
  const id = parseInt(req.params.id);

  const flowerIndex = data.flowers.findIndex((flower) => flower.id === id);

  if (flowerIndex === -1) {
    return res.status(404).json({ error: "Flor no trobada" });
  }

  // Actualitzem només els camps enviats
  data.flowers[flowerIndex] = {
    ...data.flowers[flowerIndex],
    ...body,
  };

  writeData(data);

  res.json({ message: "Flor actualitzada correctament" });
});

// DELETE /flors/:id
router.delete("/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const flowerIndex = data.flowers.findIndex((flower) => flower.id === id);

  if (flowerIndex === -1) {
    return res.status(404).json({ message: "Flor no encontrada" });
  }

  data.flowers.splice(flowerIndex, 1);
  writeData(data);
  res.json({ message: "Flor eliminada correctamente" });
});

export default router;
