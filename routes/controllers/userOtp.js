import Otp from "../../database/models/Otp.js";
import User from "../../database/models/User.js";
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();

const user_otp_once = async(req,res)=>{
    const id = req.user._id.toString();
    const userFound =  await User.findOne({ _id: id })

    const rand =   Math.random().toString().substr(2, 6)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.user,
          pass: process.env.PASS,
        },
      });
    
      const mailOptions = {
        from: {
          name: 'SEO management',
          address: process.env.user,
        },
        to: userFound.email,
        subject: 'Otp Check',
        text: `Your Password OTP is ${rand}` ,
      };
    
    
      const sendMail = async () => {
        try {
          const info = await transporter.sendMail(mailOptions);
          const userCreated = await Otp.create({
            otp:rand,
            user: id,
          });
         return res.status(200).json({success:'Email sent'});
        } catch (error) {
          console.log(error);
          return  res.status(500).json({error:error});
        }
      };
      sendMail();

    
}
export default user_otp_once;
