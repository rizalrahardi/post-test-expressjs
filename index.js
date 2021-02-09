const express = require ('express')
let books = require ('./db/books.json')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/v1/books', (req, res) => {
    res.status(200).json(books)
})

app.get('/api/v1/books/:id', (req, res) => {
    const post = books.find(i => i.id === +req.params.id)
    res.status(200).json(post)
})


app.post('/api/v1/books', (req, res) => {
    console.log(req.body)
    const { judul, sinopsis, penulis, genre} = req.body

    const id = books[books.length - 1].id + 1
    const isbn = books[books.length - 1].isbn + 1
    const post = {
        id, isbn, judul, sinopsis, penulis, genre
    }

    books.push(post)

    res.status(201).json(books)
})

app.delete('/api/v1/books/:id', (req, res) => {
    books = books.filter(i => i.id !== + req.params.id)
    res.status(200).json(books)
})

app.put('/api/v1/books/:id', (req, res) => {
    const id = req.params.id
    books.filter(post => {
        if(post.id == id ){
            post.judul = req.body.judul
            post.sinopsis = req.body.sinopsis
            post.penulis = req.body.penulis
            post.genre = req.body.genre
            return post
        }
    })
    res.status(200).json(books)
})

app.listen(port, () => {
    console.log('Server Ready')
})
