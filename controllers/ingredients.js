const router = require('express').Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');
const Ingredient = require('../models/ingredient.js');

// router logic will go here - will be built later on in the lab
router.get('/', async (req,res)=>{
    try{
    const Ingredients = await Ingredient.find()
    res.render('Ingredients/index.ejs', {Ingredients})
    } catch(error){
        console.log(error);
        res.redirect('/')
    }
})

router.post('/', async (req,res)=>{
    try {
        await Ingredient.create(req.body)
        res.redirect('/ingredients')
    } catch (error) {
        console.log(error);
    }
})

router.put('/:ingredientId',async (req,res)=>{
    try {
        await Ingredient.findByIdAndUpdate(req.params.ingredientId, req.body)
        res.redirect('/ingredients')
    } catch (error) {
        console.log(error);
    }
})

router.delete('/:ingredientId', async (req,res)=>{
    try {
        await Ingredient.findByIdAndDelete(req.params.ingredientId)
        res.redirect('/ingredients')
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
