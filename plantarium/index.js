import express from "express";
import { UserRepository } from "./user-repository.js";
import { PORT, SECRET_JWT_KEY} from "./config.js";
import jwt from "jsonwebtoken";


const app = express();
app.use(express.json());
app.use(express.static("public")); // Càrrega CSS i altres fitxers públics



app.set("view engine", "ejs"); // Li dic a express quin és el motor de plantilles (el format)
app.set("views", "./views"); // Ubicació de les plantilles


app.get("/", (req, res) => {

  res.render("login");
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


app.listen(PORT, () => {
  console.log(`:P Server running on http://localhost:${PORT}/`);
});
