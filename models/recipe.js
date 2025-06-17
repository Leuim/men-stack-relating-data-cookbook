const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name:{
        type:String,
         required:true
        },
    instruction:{
        type:String,
         required:true
        },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
         ref:'User'
        }
})

const Recipe = mongoose.model('Recipe', recipeSchema)
module.exports = Recipe