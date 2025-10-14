import express from "express";
import productRoutes from "./routes/products.js";
import bookRoutes from "./routes/books.js";
import methodOverride from "method-override";
import { PORT, SECRET_JWT_KEY } from "./config.js";
import { UserRepository } from "./user-repository.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public")); // Càrrega CSS i altres fitxers públics
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs"); // Motor de plantilles
app.set("views", "./views"); // Ubicació de les plantilles

//inicio middleware
app.use((req, res, next) => {
  const token = req.cookies.access_token; //recupero token de les cookies
  req.session = { user: null };
  try {
    const data = jwt.verify(token, SECRET_JWT_KEY); // verifico token, retonra el playload ({ id: user._id, username: user.username })
    /*
    La función verifica tres cosas:

    - Que el token esté bien formado.
    - Que la firma coincida (o sea, no ha sido alterado).
    - Que no haya caducado (según exp).
    */
    req.session.user = data;
  } catch (error) {
    req.session.user = null;
  }
  next();
});

app.use("/products", productRoutes);
app.use("/books", bookRoutes);

app.get("/", (req, res) => {
  const { user } = req.session;
  res.render("login", user);
});
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserRepository.login({ username, password }); //faig comprovacions

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
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const id = await UserRepository.create({ username, password });
    res.send({ id });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
app.post("/logout", (req, res) => {
  res
    .clearCookie("access_token")
    .json({ message: "logout successfull" })
    .send("logout");
});
app.get("/protected2", (req, res) => {
  const { user } = req.session;
  if (!user) return res.status(403).send("acceso no autorizado");
  res.render("protected2", user);
});
app.get("/protected", (req, res) => {
  const { user } = req.session;
  if (!user) return res.status(403).send("acceso no autorizado");
  res.render("home", user);
});
app.listen(PORT, () => {
  console.log(`Server running on port${PORT}`);
});
