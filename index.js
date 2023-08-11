// app.js
const express = require('express');
const connectDB = require('./config/db');
const cp = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

//For the Books
const books = require('./routes/api/books');

const app = express();
app.use(cp());
//Connect Databse
connectDB();

//For cors
app.use(cors({origin:true, credentials: true}));

// Init Middleware
app.use(express.json({ extended: false }));

//For Authentication/Authorisation
app.get("/set/cookie", (req, res) => {
    
    //Creating the payload/data
    const payload = {
        name: "John Doe",
        age: "20",
        website: "google.com"
    }

    //Signing the payload
    const token = jwt.sign(payload, "LosPollos")

    //Sending the token
    res.cookie("token", token, {
        httpOnly: true
    }).send("Cookie Shipped")
})

//Return all headers
app.get("/get/cookie", (req, res) => {
    //Getting the token
    const token = req.cookies.token;
    
    //Verifying the token
    const payload = jwt.verify(token, "LosPollos")

    res.json({
        token, payload
    })
})

//For showing results in Terminal
app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/books', books);

const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));