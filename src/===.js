//Description : Node Express Rest API with Sequelize and SQLite CRUD Book
//npm Install express sequlize sqlite3
//Run this file with node sequlizeSQLiteCRUDBook.js
//Test with Postman

const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const { mongo, default: mongoose } = require('mongoose');

//Database connection
mongoose.connect(
    "mongodb://admin:MALpoo27910@node59038-bestt.proen.app.ruk-com.cloud:11899",
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

);

//set db url
//create a connection to the database
// const sequelize = new Sequelize('database' , 'username' , 'password' ,{
//     host: 'localhost',
//     dialect: 'sqlite',
//     storage: './Database/SQBooks.sqlite'
// });

//define the Book model
const Book = mongoose.model('book' ,{
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    title: String,
    author: String,
});

const app = express();
app.use(bodyParser.json());

//Create
app.post('/books' ,async (req , res) => {
    try {
        const lastBook = await Book.findOne().sort({id: -1 });
        const nextId = lastBook ? lastBook.id + 1 : 1;

        const book = new Book({
            id: nextId, //Set the custom "id" field
            ...req.body,//Include other book data from the request body
        });

        await book.save();
        res.send(book);
    }catch (error){
        res.status(500).send(error);
    }
});

//Red all
app.get('/books/:id' ,async (req , res)=> {
        try {
const books = await Book.find();        
            res.send(books);
        }catch(error){
            res.status(500).send(error);
        }
});

//Read one
app.get('/books/:id' ,async (req , res)=> {
    try {
const book = await Book.findOne({id:req.params.id});        
        res.send(book);
    }catch(error){
        res.status(500).send(error);
    }
});


//Update
app.put('/books/:id' ,async (req , res)=> {
    try {
const book = await Book.findOneAndUpdate({id:req.params.id},req.body,{
    new: true,
});        
        res.send(book);
    }catch(error){
        res.status(500).send(error);
    }
});

//Delete 
app.delete('/books/:id' ,async (req , res)=> {
    try {
const book = await Book.findOneAndDelete({id:req.params.id});        
        res.send(book);
    }catch(error){
        res.status(500).send(error);
    }
});

//start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT , () => 
console.log(`Start Server at http://localhost:${PORT}...`));
