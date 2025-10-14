import express from 'express';
import { PORT, SECRET_JWT_KEY } from './config.js';

import { name } from 'ejs';
import { UserRepository } from './user-repository.js';

const app = express();

app.use(express.json()); // processar solicituds en format json
app.use(cookieParser());
app.use(express.static("public")); //?

app.set('view engine', 'ejs');//Fem servir el motor ejs
app.set('views', './views'); //carpeta on desem els arxius .ejs

// inici endpoints
app.get('/', (req, res) => {
    //res.send('holaaa');
    
    //res.render('login');
    res.render('register');

});

app.post('/register', async (req, res) => {
    
    // quan envio formulari, les dades s'envien en el body de la petició
    const { username, password } = req.body;
    console.log(req.method);

    try {
        const id = await UserRepository.create({username, password});
        res.send({id});

    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.listen(PORT, (req, res)=>{
    console.log(`:P Servidor escoltant a http://localhost:${PORT}`);
});