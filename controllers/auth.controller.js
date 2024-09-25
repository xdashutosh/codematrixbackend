
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import { News } from "../models/news.model.js";

dotenv.config();

//sign up
export const Signup= async (req,res)=>{
    try {
        const {username,email,password} = req.body;
        const isEmail = await User.findOne({email: email});
      if(isEmail)
        {return res.json({
            status:false,
            message:'user already registerd!'
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
        message:'wrong credentials!',
         userExisted:true                
    })
}
    }      
        else{
            
           return res.json({
                isAuthenticated:false,
                message:'User not registered!',
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
        const {email,heading,points,details,image,newsDate,pending} = req.body;
        const newNews = new News({email,heading,points,details,image,newsDate,pending});

        await newNews.save();
        res.status(200).json({
            DataSaved:true,
            newNews
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const GetData = async (req, res) => {
    try {
      const { email } = req.body;
      const checkByEmail = await News.find({email: email});
      res.status(200).json(checkByEmail);
    } catch (error) {
      return res.json({
        isFetched: false,
      });
    }
  };

  export const Userdata = async (req, res) => {
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
        const AllNews = await News.find();
    res.status(200).json(AllNews);
    } catch (error) {
      return res.json({
        isFetched: false,
      });
    }
  };

  export const GetApprove = async (req, res) => {
    try {
      const {email,newsDate}= req.body;
        const AllNews = await News.findOne({email:email,newsDate:newsDate});
        console.log(AllNews.pending)
    
          AllNews.pending=false;
         await AllNews.save();
          res.status(200).json({approved:true});
    } catch (error) {
      return res.json({
        isFetched: false,
      });
    }
  };


