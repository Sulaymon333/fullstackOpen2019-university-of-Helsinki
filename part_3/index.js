const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())

// 3.7 add morgan logger package and use tiny config
// app.use(morgan('tiny'))

// 3.7 added morgan custom log using token
morgan.token('response', function (req, res) {
    return JSON.stringify(req.body)
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :response'))

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 4
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    },

]
// base URL
app.get('/api', (req, res) => res.send('<h1>My API is cool</h1>'))

// 3.1 get all persons
app.get('/api/persons', (req, res) => res.json(persons))

// 3.2 get info
app.get('/info', (req, res) => {
    res.send(`
    <div>
        <p>Phonebook has info of ${persons.length} people</p>
        <p>${new Date()}</p>
    </div>`);
})

// 3.3 get a single phone book entry 
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    person ? res.json(person) : res.status(404).end()
})

// 3.4 delete single phone book entry
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

// 3.5  & 3.6 create a person and error handling
app.post('/api/persons', (req, res) => {
    const body = req.body
    const generatedId = Math.floor(Math.random() * 100) + 1
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: !body.name ? 'name missing' : 'number missing'
        })
    }
    if (persons.find(person => person.name === body.name)) {
        return res.status(400).json({
            'error': `${body.name} already exist in the phone book`
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generatedId
    }

    // console.log(JSON.stringify(person))
    persons = [...persons, person]
    res.json(person)
})

const PORT = 3006

app.listen(PORT, () => {
    console.log(`Sever is running on port ${PORT}`)
})