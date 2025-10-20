import express from 'express';
import fs from "fs"; //treballar amb arxius


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
