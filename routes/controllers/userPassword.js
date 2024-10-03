
import Otp from "../../database/models/Otp.js";
import User from "../../database/models/User.js";
import bcrypt from "bcryptjs";
const user_password = async (req, res) => {
    const id = req.user._id.toString();
    const {password,otp} = req.body

    try{
        
        const user =await User.findOne({_id:id})
        const otpUser = await Otp.findOne({otp:otp})

      if(user._id.toString() == otpUser.user){
        const hashed_password = await bcrypt.hash(password, 7);
        user.password=hashed_password
        await user.save()
        const   deleted = await Otp.findOneAndDelete({otp:otpUser.otp})
        if(deleted){
            return res.status(200).json({ success:"Password set successfully" });

        }
        return   res.status(400).json({ error: "not found" })


      }
      return   res.status(400).json({ error: "not found" })



    }
   catch(e){
    return  res.status(400).json({ error: e })

   }
    

}
export default user_password;