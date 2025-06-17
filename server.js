const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()

const methodOverride = require('method-override');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const passUserToView = require('./middleware/pass-user-to-view');
const isSignedIn = require('./middleware/is-signed-in');

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000";

//middle wares
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passUserToView);


//db connection
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', ()=>{
    console.log(`Connected to: ${mongoose.connection.name}`);
})


app.get('/', async(req,res)=>{
    res.render('index.ejs',{user:req.session.user})
})

// plugging the cotrollers
const authController = require('./controllers/auth.js')
const recipesController = require('./controllers/recipes.js');
const ingredientsController = require('./controllers/ingredients.js');

app.use('/auth', authController)
app.use('/recipes', isSignedIn, recipesController )
app.use('/ingredients', isSignedIn, ingredientsController )


app.listen(port, ()=>{
    console.log(`Listening to port: ${port}`);
})