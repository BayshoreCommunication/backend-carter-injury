import Otp from "../../database/models/Otp.js";
import User from "../../database/models/User.js";
import bcrypt from "bcryptjs";

const user_otp_check_and_set_password =async(req,res)=>{
          const id = req.user._id.toString();
          const {otp,password}=req.body
        try{
        const otpUser = await Otp.findOne({otp:otp})
        const user = await User.findOne({_id:id})

      if(otpUser.user == id){
        const currentDate = new Date();
        const diff=currentDate - otpUser.createdAt;
        const  difff=diff/ 1000 / 60
        if(difff >= 5){
            return res.status(400).json({ error: "session Expired" })
        }
        if(password.length < 6){
          return res.status(400).json({ error: "password should be at least 6 characters" });
  
        }
        const hashed_password = await bcrypt.hash(password, 7);
        user.password=hashed_password
        await user.save()
        const   deleted = await Otp.findOneAndDelete({otp:otpUser.otp})
        if(deleted){
            return res.status(200).json({ success:"Password set successfully" });

        }
        return res.status(200).json({ success: "true" })
      }
      return   res.status(400).json({ error: "Not found" })
        }
        catch(e){
            return res.status(400).json({ error: "something wrong" });
        }   
}
export default user_otp_check_and_set_password;
