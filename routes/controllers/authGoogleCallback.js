import User from "../../database/models/User.js";
import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();
  const auth_google  =async(req,res) =>{

   


      const { code } = req.body;

      try{
       
        const users =await User.find()
        const user =  users[0]
        user.authToken = code
        await user.save()
        return res.status(200).json({ success: "success" })


  
      }
      catch(e){
        return res.status(400).json({ error: "something wrong" });

      }
     

  }

export default auth_google;
