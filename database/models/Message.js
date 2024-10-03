import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const messageSchema = new Schema({

    name: {   
        type: String,  
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    message: {
        type: String,
    }
    
}, { timestamps: true })



const Message = mongoose.model('Message', messageSchema);
export default Message
