import User from "../../database/models/User.js";
import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();
  const auth_google  =async(req,res) =>{
    const id = req.user._id.toString();

    const oauth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URI
      );

try{
      const user =await User.findOne({_id:id})
      if(user.authToken){
        oauth2Client.setCredentials(JSON.parse(user.authToken));
        const scopes = [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/webmasters',
            'https://www.googleapis.com/auth/webmasters.readonly',
          ];
          const url = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
          });
          return res.status(200).json({ success:url })

      }

      return res.status(400).json({ error: "something wrong" });

   

}
catch(e){
    return res.status(400).json({ error: "something wrong" });

}

      


  }

export default auth_google;
