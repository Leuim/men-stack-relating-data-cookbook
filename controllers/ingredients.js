const router = require('express').Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');
const Ingredient = require('../models/ingredient.js');

// router logic will go here - will be built later on in the lab
router.get('/', async (req,res)=>{
    try{
    const Ingredient = await Ingredient.find()
    
    } catch(error){
        console.log(error);
        res.redirect('/')
    }
})

module.exports = router;
