import express from "express";
import { UserRepository } from "./user-repository.js";
import { PORT, SECRET_JWT_KEY} from "./config.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./authMiddleware.js";

import { readData, writeData } from "./controllers/db.controller.js";


import florsRouter from "./routes/flowerRoutes.js";
import arbresRouter from "./routes/treeRoutes.js";


const app = express();
app.use(express.json());
app.use(express.static("public")); // Càrrega CSS i altres fitxers públics
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// middleware d'autenticació
app.use(authMiddleware);


app.set("view engine", "ejs"); // Li dic a express quin és el motor de plantilles (el format)
app.set("views", "./views"); // Ubicació de les plantilles


app.use("/flors", florsRouter);
app.use("/arbres", arbresRouter);

app.get("/", (req, res) => {

  if(!req.session.user){
    return res.redirect("/protected");
  }

  res.render("home");
});


app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {

  const { username, password } = req.body;
  console.log(username, password);

  try {

    const id = await UserRepository.register({ username, password });
    res.send({ id });
  } catch (error) {
    res.status(400).send(error.message);
  }

});

app.get("/login", (req, res) => {

  res.render("login");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserRepository.login({ username, password });

    // creo token
    const token = jwt.sign(
      { id: user._id, username: user.username }, // playload
      SECRET_JWT_KEY,
      {
        expiresIn: "1h",
      }
    );
    // genero cookie
    res
      .cookie("access_token", token, {
        httpOnly: true,

        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60,
      })
      .send({ user, token });
  } catch (error) {
    res.status(401).send(error.message);
  }


});


app.get("/protected", (req, res) => {
  res.render("protected");
});


// GET /form
app.get('/form', (req, res) => {
    const data = readData();
    res.render("form", { data });
});

// GET /form-edit
app.get('/form-edit', (req, res) => {
    const id = parseInt(req.query.id);
    console.log("idddd", id, req.url);
    const data = readData();
    const dataFlower = data.flowers.find(flower => flower.id === id);

    res.render("form-edit", { data: dataFlower });
});


app.listen(PORT, () => {
  console.log(`:P Server running on http://localhost:${PORT}/`);
});
