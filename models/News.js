const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    image: {
        type: String,
    },
    subject: {
        type: String,
        required: true,
    },
    slug:{
        type:String
    },
    
   
    
});

module.exports = News = mongoose.model("news", UserSchema);
