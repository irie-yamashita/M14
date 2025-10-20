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
    res.render("trees", { data });
});




export default router;
