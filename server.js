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

app.get('/frontend/login.html', (req, res) => {
    res.sendFile(path.join(initalPath, "frontend", "login.html"));
});


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

app.post('/login-user', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json("Please fill in all fields.");
    }

    try {
        const user = await db.select('*').from('users').where({ email }).first();

        if (!user) {
            return res.json("Email does not exist.");
        }

        if (!user.password || user.password !== password) {
            return res.json("Incorrect password.");
        }

        res.json({ name: user.name, email: user.email });

    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json("Internal server error.");
    }
});




app.listen(5000, (req, res) => {
    console.log('listening on port 5000......')
})