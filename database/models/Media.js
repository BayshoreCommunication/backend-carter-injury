import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const mediaSchema = new Schema({
 image:{
    public_id: {
        type: String,   
      },
      url: {
        type: String,
      },
 },
    imageTitle: {  
        type: String,
    },
    altText: {
        type: String,
    },
       user: {
        type: mongoose.Schema.Types.ObjectId,
  
        ref: "User",
      },

}, { timestamps: true })



const Media = mongoose.model('Media', mediaSchema);
export default Media
