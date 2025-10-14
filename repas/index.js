
import cookieParser from 'cookie-parser';
import { PORT } from './config.js';
import express from 'express';



const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(express.static('public')); //?

//per utilitzar .ejs
app.set('view engine', 'ejs');
app.set('views', './views')

//
app.get('/', (req, res) => {
    res.render('register');
});

app.get('/protected', (req, res) => {
    res.render('protected');
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    const id = await UserRepository.create(username, password);
    res.send(id);
    
});

app.listen(PORT, (req, res) => {
    console.log(`Sirviendo en o_- http://localhost:${PORT}`);
})