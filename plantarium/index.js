import express from "express";
import { PORT } from "./config.js";

const app = express();
app.use(express.json());
app.use(express.static("public")); // Càrrega CSS i altres fitxers públics



app.set("view engine", "ejs"); // Li dic a express quin és el motor de plantilles (el format)
app.set("views", "./views"); // Ubicació de les plantilles


app.get("/", (req, res) => {

    res.render("login");
});


app.listen(PORT, () => {
  console.log(`:P Server running on http://localhost:${PORT}/`);
});
