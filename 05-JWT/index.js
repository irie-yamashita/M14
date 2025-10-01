import express from "express";
import fs from "fs"; //treballar amb arxius
import bodyParser from "body-parser"; //Ho afegim per entendre que estem rebent un json des de la petició post.

//Creo l'objecte de l'aplicació
const app = express();
app.use(bodyParser.json());

;
app.use(express.static("public"));//carpeta publica pel css
app.set('view engine', 'ejs');//Fem servir el motor ejs
app.set('views', './views'); //carpeta on desem els arxius .ejs

const readData = () => {
    try {
        const data = fs.readFileSync("./db.json");
        //console.log(data);
        //console.log(JSON.parse(data));
        return JSON.parse(data)

    } catch (error) {
        console.log(error);
    }
};
//Funció per escriure informació
const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data));

    } catch (error) {
        console.log(error);
    }
};
//Funció per llegir la informació
//readData();

app.get("/", (req, res) => {
    res.send("Welcome to my first API with Node.js");
});

app.get('/products', (req, res) => {
    const user = { name: "ITB" }
    const htmlMessage = `
    <p>A continuació una llista de <strong>productes barats</strong> i de bona qualitat:</p>
    <a href="https://itb.cat/">Visita la web</a>`;
    const data = readData();
    res.render("products", { user, data, htmlMessage })
    //es.json(data.products);
});

app.get('/flowers', (req, res) => {
    const htmlMessage = `
    <a href="/">Visita la web</a>`;
    const data = readData();
    res.render("flowers", { data, htmlMessage })
});

app.get("/login", (req, res) => {
     res.render("login")
});


//Funció per escoltar
app.listen(3000, () => {
    console.log("Server listing on port 3000 - http://localhost:3000");
});