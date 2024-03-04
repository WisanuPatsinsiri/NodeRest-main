const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require(cors)


mongoose.connect( // ถ้าจะรันในRukcom ไม่ต้องมีเลขตามหลัง แต่ถ้ารัน local ต้องมีเลขตามหลัง
    "mongodb://admin:MALpoo27910@node59038-bestt.proen.app.ruk-com.cloud", {
        useNewUrlParser: true,
        useUnifiedtopology: true,
    }
)

const Book = mongoose.model("Book", {
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    title: String,
    author: String,
})

const app = express()
app.use(bodyParser.json())


app.post("/books", async(req, res) => {

    try {

        const lastBook = await Book.findOne().sort({ id: -1 })
        const nextId = lastBook ? lastBook.id + 1 : 1


        const book = new Book({
            id: nextId,
            ...req.body,
        })


        await book.save()
        res.send(book)
    } catch (err) {
        res.status(500).send('Eror1')
    }
})


app.get('/books', async(req, res) => {
    try {
        const books = await Book.find()
        res.send(books)
    } catch (err) {
        res.status(500).send('Error2')
    }
})


app.get('/books/:id', async(req, res) => {

    try {
        const book = await Book.findOne({ id: req.params.id })

        res.send(book)

    } catch (err) {
        res.status(500).send('Error3')
    }
})


app.put('/books/:id', async(req, res) => { // show create desktop
    try {
        const book = await Book.findOneAndUpdate({ id: req.params.id }, req.body, {
            new: true,
        })
        res.send(book)
    } catch (err) {
        res.status(500).send('Error4')
    }
})


app.delete('/books/:id', async(req, res) => {
    try {
        const book = await Book.findOneAndDelete({ id: req.params.id })
        res.send(book)
    } catch (err) {
        res.status(500).send('Error5')
    }
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server Started at http://localhost${PORT}`))