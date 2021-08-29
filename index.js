const express = require('express')

const session = require('express-session')


const routes = require('./routes')
// const cors = require('cors')






const app = express()
const port = process.env.PORT || 3000


// Site Estatico HTML
app.use('/', express.static(__dirname + '/public'));

// Body Parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cors({ origin: '*' }));

app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: false
   
}))


// Rotas dinamicas nodejs
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

