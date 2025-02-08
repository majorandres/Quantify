const express = require ('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

//Gizmo's SQL Database
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'Andres1000',
        database: 'loginform'
    }
})

const app = express();

let initalPath = path.join(__dirname, "public")

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(initalPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(initalPath, "index.html"));
})

app.get('frontend/login.html', (req, res) => {
    res.sendFile(path.join(initalPath, "/frontend/login.html"));
})


app.get('/register', (req, res) => {
    res.sendFile(path.join(initalPath, "register.html"));
})

app.post('/register-user', (req, res) => {
    const { name, email, password} = req.body;

    if(!name.length || !email.length || !password.length){
        res.json('fill all the fields');

    } else{
        db("users").insert({
            name: name,
            email: email,
            password: password
        })
        .returning(["name", "email"])
        .then(data => {
            res.json(data[0])
        })
        .catch(err => {
            if(err.detail.includes('already exists')){
                res.json('email already exists');
            }
        })
    }
})

app.post('/login-user', (req, res) => {
    const { email, password} = req.body;

    db.select('name', 'email')
    .from('users')
    .where({
        email: email,
        password: password
    })
    .then(data => {
        if(data.length){
            res.json(data[0]);

        }else{
            res.json('email or password is incorrect');
        }
    })
})


app.listen(5000, (req, res) => {
    console.log('listening on port 5000......')
})