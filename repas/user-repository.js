import bcrypt from 'bcryptjs';
import DBLocal from 'db-local';
import crypto from 'node:crypto'; // no cal npm i, pq forma part ja de Node
import { SALT_ROUNDS } from './config.js';


// connexió a la base de dades
const { Schema } = new DBLocal({path:'./db'});

//creo taula
const User = Schema( 'user', {
        _id: { type: String, required:true },
        username: { type: String, required:true },
        password: { type: String, required:true },
    }
);


export class UserRepository {
    static async create({username, password}) {
        Validation.username(username);
        Validation.password(password);

        // fa select per 'username' a la db 
        const user = User.findOne({username}); // {username: username}

        // comprovo que no hi hagi un usuari amb el mateix 'username'+
        if(user) throw new Error('username already exists');

        // genero id únic amb llibreria crypto
        const id = crypto.randomUUID();

        // encripto contrasenya
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        
        //creo usuari i el guardo a la db
        User.create({
            _id: id,
            username,
            password: hashedPassword,
        }).save();

        return id;

    }

    static async login({username, password}) {

    }
};

class Validation {
    static username(username){
        if(typeof username != 'string') throw new Error('username must be a string');
        if(username.length < 3) throw new Error('Username superior a 3 caracteres');

    }
    static password(password){
        if(typeof password != 'string') throw new Error('password must be a string');
        if(password.length < 6) throw new Error('password superior a 5 caracteres');
    }
};