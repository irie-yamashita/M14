import jwt from "jsonwebtoken";
import { SECRET_JWT_KEY } from "./config.js";
import cookieParser from "cookie-parser";

// llegeix token, valida i el guarda
export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.access_token; //recupero token de les cookies
    req.session = { user: null };
    try {
        const data = jwt.verify(token, SECRET_JWT_KEY); // verifico token, retorna el playload ({ id: user._id, username: user.username })
        req.session.user = data;
    } catch (error) {
        req.session.user = null;

    }

    next();
}

// verifica si hi ha usuari identificat
export const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/protected");
  }
  next();
};
