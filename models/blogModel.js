const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        
    },
    description:{
        type:String,
        required:true,
       
    },
    category:{
        type:String,
        required:true,
      
    },
    numViews:{
        type:Number,
        required:true,
        default:0,
    },
    isLiked:{
        type:Boolean,
        default:false
    },
    isDisLiked:{
        type:Boolean,
        default:false
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Userdata"
    }],
    dislikes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Userdata"
    }],
    image:{
        type:String,
        default:"img"
    },
    author:{
        type:String,
        default:"Admin"
    }
    

},{
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    },
        timestamps:true
    
});

//Export the model
module.exports = mongoose.model('Blog', blogSchema);