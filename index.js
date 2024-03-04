const express = require('express')
const Sequelize = require('sequelize')
const app = express()
const cors = require(cors)


app.use(express.json())
app.use(cors())
const dbUrl = 'postgres://webadmin:YLMino65033@node59039-bestt.proen.app.ruk-com.cloud:11901/Books'

const sequelize = new Sequelize(dbUrl);


const Book = sequelize.define("book",{
    id :{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    title :{
        type: Sequelize.STRING,
        allowNull: false // have to
    },
    author :{
        type: Sequelize.STRING,
        allowNull: false // have to        
    },  
})

sequelize.sync()

app.get('/books',(req,res)=>{
    Book.findAll().then(books =>{
        res.json(books)
    }).catch(err=>{
        res.status(500).send(err)
    })
})


app.get('/books/:id',(req,res)=>{
    Book.findByPk(req.params.id).then(book =>{
        if(!book) {
            res.status(404).send('Book not found')
        }else{
            res.json(book)
        }
    }).catch(err=>{
        res.status(500).send(err)
    })
})



app.post('/books',(req,res)=>{
    Book.create(req.body).then(book =>{
        res.send(book)
        
    }).catch(err=>{
        res.status(500).send(err)
    })
})


app.put('/books/:id',(req,res)=>{
    Book.findByPk(req.params.id).then(book =>{
        if(!book){
            res.status.send('Bookn not found')
        }else{
            book.update(req.body).then(()=>{
                res.send(book)
            }).catch(err=>{
                res.status(500).send(err)
            })
        }
    }).catch(err=>{
        res.status(500).send(err)
    })
})


app.delete('/books/:id',(req,res)=>{
    Book.findByPk(req.params.id).then(book =>{
        if(!book){
            res.status.send('Bookn not found')
        }else{
            book.destroy().then(()=>{
                res.send({})
            }).catch(err=>{
                res.status(500).send(err)
            })
        }
    }).catch(err=>{
        res.status(500).send(err)
    })
})


const port = process.env.PORT || 3000
app.listen(port,()=> console.log(`Listening on port ${port}`))