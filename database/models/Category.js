import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const categorySchema = new Schema({ 

    name: {
        type: String,
    },
    description: {
        type: String,
    },
    slug: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
  
        ref: "User",
      },
}, { timestamps: true })



const Category = mongoose.model('Category', categorySchema);
export default Category
