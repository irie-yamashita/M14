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
    console.log("holaaaa productooo")
    const user = { name: "Francesc" }
    const htmlMessage = `
    <p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p>
    <a href="https://www.example.com">Visita Example</a>`;
    const data = readData();
    res.render("products", { user, data, htmlMessage })
    r//es.json(data.products);

    console.log("Holaaa des de /products");
});


//Funció per escoltar
app.listen(3000, () => {
    console.log("Server listing on port 3000 - http://localhost:3000");
});