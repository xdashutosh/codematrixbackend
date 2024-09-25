import mongoose from "mongoose";


const newsSchema = new mongoose.Schema({

email:{
    type:String,
},

    heading:{
        type:String,
    },
    points:{
        type:String,
    },
    details:{
        type:String,
    },
    image:{
        type:String,
    },
    newsDate:{
        type:String,
    },
    pending:{
        type:Boolean,
    },
   
   

},
{timestamps:true}
);

export const News = mongoose.model("News",newsSchema);
