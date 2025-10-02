import express from 'express';
import { PORT, SECRET_JWT_KEY } from './config.js';
import { name } from 'ejs';

const app = express();

app.use(express.json()); // processar solicituds en format json
app.use(express.static("public")); //?

app.set('view engine', 'ejs');//Fem servir el motor ejs
app.set('views', './views'); //carpeta on desem els arxius .ejs

// inici endpoints
app.get('/', (req, res) => {
    //res.send('holaaa');
    
    //res.render('login');
    res.render('register');

});

app.post('/register', (req, res) => {
    // quan envio formulari, les dades s'envien en el body de la petició
    const { username, password } = req.body;

    console.log(username, name);
});

app.listen(PORT, (req, res)=>{
    console.log(`:P Servidor escoltant a http://localhost:${PORT}`);
});