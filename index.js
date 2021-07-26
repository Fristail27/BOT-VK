const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const mainPage = require('./routes/index')
const cookieParser = require('cookie-parser');
const keys = require('./keys/keys.prod')
require('dotenv').config()

const PORT = keys.PORT || 3000

const app = express()

const hbs = exphbs.create({extname: 'hbs'})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(mainPage)

async function start () {
    try {
        await mongoose.connect(`mongodb+srv://Fristail27:${keys.MONGO_DB_PASSWORD}@cluster0.rkdll.mongodb.net/data`, {
            useNewUrlParser: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => {
            console.log('Server has been started')
        })
    } catch (err) {
        console.log(err)
    }
}

start()
