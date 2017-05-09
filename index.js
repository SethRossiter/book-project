


var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var cors = require('cors')
var server = express()
var port = 3400
var connectionString = "mongodb://student:student@ds147900.mlab.com:47900/bookcase"
var connection = mongoose.connection;

//

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))
server.use(cors())
server.use('/', express.static('${__dirname}/Public/'))

//

mongoose.connect(connectionString, {
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
})

connection.on('error', function (err) {
    console.log('There was a connection problem', err)
})

connection.once('open', function () {
    console.log('We are now connected to the books database')
    server.listen(port, function () {
        console.log("Connection is working", 'http://localhost:' + port)
    })
})

// BOOK IN THE DATABASE
var Schema = mongoose.Schema
var BookCaseSchema = new Schema({
    title: { type: String, required: true },
    published: { type: String },
    rating: { type: Number },
    author: { type: String, required: true }
})
var Book = mongoose.model('Book', BookCaseSchema)

// GET REQUESTS

server.get('/', function(req, res, next){
    res.send('Welcome to the Library')
})

server.get('/books', function(req, res, next){
    Book.find({}).then(function (books){
    res.send(books)
    })
})

server.get('/books/search', function(req, res, next){
    var query = req.query
    Book.find(query).then(function (books){
        res.send(books)
    })
})

server.get('/books/:id', function (req, res, next){
    var id = req.params.id
    Book.findById(id).then(function (book){
        res.send(book)
    })
    .catch(function(e){
        res.send(e)
    })
})

//POST REQUESTS

server.post('/books', function(req, res, next){
    var newBook = req.body
    Book.create(newBook)//create newbook with newbook...
    .then(function (newlyCreatedBook){
        res.send(newlyCreatedBook)
    })
})

//PUT REQUESTS

server.put('/books/:id', function(req, res, next){
    var id = req.params.id
    var updatedBook = req.body
    Book.findByIdAndUpdate(id, updatedBook)
    .then(function (){
        res.send(updatedBook)
    })
})


