import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const logoSchema = new Schema({

    logo: {
        type: String,
    },
    name:{
        type: String,
        
    }
       

}, { timestamps: true })



const Logo = mongoose.model('Logo', logoSchema);
export default Logo
