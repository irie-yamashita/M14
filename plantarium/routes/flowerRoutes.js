import express from 'express';
import fs from "fs"; //treballar amb arxius
import crypto from 'node:crypto'; // no cal npm i, pq forma part ja de Node



const router = express.Router();

const readData = () => {
    try {
        const data = fs.readFileSync("./db/db.json", "utf-8");
        //console.log(data);
        //console.log(JSON.parse(data));
        return JSON.parse(data);

    } catch (error) {
        console.log(error);
    }
};
//Funció per escriure informació
const writeData = (data) => {
    try {
        fs.writeFileSync("./db/db.json", JSON.stringify(data));

    } catch (error) {
        console.log(error);
    }
};

// GET /flors
router.get('/', (req, res) => {
    const data = readData();
    res.render("flowers", { data });
});

// GET /flors
router.get('/form', (req, res) => {
    const data = readData();
    res.render("form", { data });
});

// GET /flors
router.get('/form-edit', (req, res) => {
    const id = req.query.id;
    const data = readData();
    const dataFlower = data.flowers.find(flower => flower.id === id);

    res.render("form-edit", { data: dataFlower });
});


// POST /flors
router.post('/', (req, res) => {
    const data = readData();
    const body = req.body;

    // Crear nova planta amb ID incremental
    const newId = crypto.randomUUID();


    const newPlant = {
        id: newId,
        name: body.name || "",
        category: body.category || "",
        color: body.color || "",
        meaning: body.meaning || "",
        bloomSeason: body.bloomSeason || "",
        origin: body.origin || "",
        description: body.description || "",
        type: body.type || "flor" // per indicar si és flor o arbre
    };

    data.flowers.push(newPlant);
    writeData(data);

    res.status(201).json(newPlant);
});

// PUT /flors/:id
router.put("/flors/:id", (req, res) => {
    const data = readData();             
    const body = req.body; 
    const id = req.params.id;

    const flowerIndex = data.flowers.findIndex(flower => flower.id === id);

    if (flowerIndex === -1) {
        return res.status(404).json({ message: "Flor no trobada" });
    }

    // Actualitzem només els camps enviats
    data.flowers[flowerIndex] = {
        ...data.flowers[flowerIndex],
        ...body
    };

    writeData(data);

    res.json({ message: "Flor actualitzada correctament" });
});

// DELETE /flors/:id
router.delete("/:id", (req, res) => {
    const data = readData();
    const id = req.params.id;
    const flowerIndex = data.flowers.findIndex((flower) => flower.id === id);

    if (flowerIndex === -1) {
        return res.status(404).json({ message: "Flor no encontrada" });
    }

    data.flowers.splice(flowerIndex, 1);
    writeData(data);
    res.json({ message: "Flor eliminada correctamente" });

});

export default router;
