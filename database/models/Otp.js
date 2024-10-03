import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const otpSchema = new Schema({

    otp: {
        type: String,
    },
       user: {
        type: mongoose.Schema.Types.ObjectId,
  
        ref: "User",
      },

}, { timestamps: true })



const Otp = mongoose.model('Otp', otpSchema);
export default Otp
