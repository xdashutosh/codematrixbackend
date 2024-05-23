import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    code: {
            title:String,
            desc:String,
            html:String,
            css:String,
            js:String,    
    }
  }, { _id: true });
  

const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
       
    },
    mycode:[
        dataSchema
    ]

},
{timestamps:true}
);

export const User = mongoose.model("User",userSchema);
