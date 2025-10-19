
import DBLocal from 'db-local'
import crypto from 'node:crypto'
import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from './config.js'


// connexió a la base de dades
const {Schema}= new DBLocal({path:'./db'});

const User = Schema('User',{
    _id:{type:String,required:true},
    username:{type:String,required:true},
    password:{type:String,required:true}
});


export class UserRepository {
    static async register({username,password}){

        console.log('Registering user:', username);

        Validation.username(username);
        Validation.password(password);


        const user = User.findOne({username});
        if(user) throw new Error('username already exists');


        const id = crypto.randomUUID();
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);


        User.create({
            _id: id,
            username: username,
            password: hashedPassword
        }).save();

    }   

    static async login({username,password}) {
        Validation.username(username);
        Validation.password(password);

        const user = User.findOne({username});
        if(!user) throw new Error('username does not exist');

        const passwdValid = await bcrypt.compare(password, user.password);
        if(!passwdValid) throw new Error('password is invalid');

        return {
            _id: user._id,
            username: user.username
        }
        
    }
}

class Validation {
    static username(username){
        if(typeof username != 'string') throw new Error('username must be a string');
        if(username.length < 3) throw new Error('Username superior a 3 caracteres');
    }
    static password(password){
        if(typeof password != 'string') throw new Error('password must be a string');
        if(password.length < 6) throw new Error('password superior a 5 caracteres');
    }
}