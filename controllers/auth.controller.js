
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

//sign up
export const Signup= async (req,res)=>{
    try {
        const {username,email,password} = req.body;
        const isEmail = await User.findOne({email: email});
      if(isEmail)
        {return res.json({
            status:false
        })}



        const newUser = new User({username,email,password});
        await newUser.save();
        res.status(200).json({
            userCreated:true
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

//login
export const Login= async(req,res)=>{
    try {
        const{email,password} = req.body;
        const checkByEmail = await User.findOne({email: email});
if(checkByEmail)
    {
if (password == checkByEmail.password) {
    return res.json({
        isAuthenticated:true,
         userExisted:true                
    })
}

else{
    return res.json({
        isAuthenticated:false,
         userExisted:true                
    })
}
    }      
        else{
            
           return res.json({
                isAuthenticated:false,
                 userExisted:false                
            })
        }
    
 
    } catch (error) {
       return res.json({
            isAuthenticated:false 
             
        })
    }

};


export const SaveData= async (req,res)=>{
    try {
        const {email,html,css,js,title,desc} = req.body;
        const theUser = await User.findOne({email: email});  
        theUser.mycode.push({
            code: {
                title,
                desc,
                html,
                css,
                js
            }
        });

        await theUser.save();
        res.status(200).json({
            DataSaved:true
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const GetData = async (req, res) => {
    try {
      const { email } = req.body;
      const checkByEmail = await User.findOne({email: email});
      res.status(200).json(checkByEmail);
    } catch (error) {
      return res.json({
        isFetched: false,
      });
    }
  };

  export const GetCard = async (req, res) => {
    try {
      const { _id } = req.body;
      const user = await User.findOne({ 'mycode._id': _id });
      if (!user) {
        return res.status(404).json({ message: 'Code not found' });
    }

    const codeObject = user.mycode.id(_id);

    if (!codeObject) {
        return res.status(404).json({ message: 'Code not found' });
    }


    return res.status(200).json({ code: codeObject });
    } catch (error) {
      return res.json({
        isFetched: false,
      });
    }
  };

  export const GetAllData = async (req, res) => {
    try {
        const Users = await User.find();
      res.status(200).json(Users);
    } catch (error) {
      return res.json({
        isFetched: false,
      });
    }
  };