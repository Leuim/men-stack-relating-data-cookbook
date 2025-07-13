const router = require('express').Router()
const { render } = require('ejs')
const Recipe = require('../models/recipe')
const Ingredient = require('../models/ingredient')
const { route } = require('./auth')

router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find({ owner: req.session.user._id.toString() }).populate('owner')
        res.render('recipes/index.ejs', { recipes })
        console.log(recipes);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

router.get('/new', async (req, res) => {
    const ingredients = await Ingredient.find()
    res.render('recipes/new.ejs', {ingredients})
})

router.post('/', async (req, res) => {
    try {
        const newRecipe = new Recipe(req.body);
        newRecipe.owner = req.session.user._id;
        await newRecipe.save();
        res.redirect('/recipes')
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

router.get('/:recipeId', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.recipeId).populate('owner').populate('ingredients')
        res.render('recipes/show.ejs', { recipe })
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

router.delete('/:recipeId', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.recipeId)
        if (recipe.owner.equals(req.session.user._id)) {
            await recipe.deleteOne()
            res.redirect('/recipes')
        } else {
            res.send('You dont have permission to do that.')
        }
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

router.get('/:recipeId/edit', async (req,res)=>{
    try{
        const recipe = await Recipe.findById(req.params.recipeId)
        const ingredients = await Ingredient.find()
        res.render('recipes/edit.ejs', {recipe, ingredients})
    }catch(error){
        console.log(error);
        res.redirect('/')
    }
})

router.put('/:recipeId', async (req,res)=>{
    try{
        const recipe = await Recipe.findById(req.params.recipeId)
        if(recipe.owner.equals(req.session.user._id)){
            await recipe.updateOne(req.body)
            res.redirect('/recipes')
        }else{
            res.send('You dont have the permission to do that.')
        }
    }catch(error){
        console.log(error);
        res.redirect('/')
    }
})

module.exports = router