import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const blogSchema = new Schema({  
   
    title: {
        type: String,   
    },
    body: {
        type: String,
    },
    metaDescription: {
        type: String,
    },
    author: {
        type: String,
    },
    category: { type: Array, "default": [] },
    bodyImage:[
                    {
                                imageTitle: {  
                                type: String,
                              },
                                altText: {
                                    type: String,
                                },
                                image:{
                                    public_id: {
                                        type: String,
                                        },
                                        url: {
                                        type: String,
                                        },
                            }
                    }
              ],
    featuredImage: 
           {
                imageTitle: {  
                    type: String,
                },
                altText: {
                    type: String,
                },
                 image:{
                    public_id: {
                        type: String,
                        },
                    url: {
                        type: String,
                        },
                }
          },
   
    published: { type: Boolean, default: false },
    slug: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
  
        ref: "User",
      },

}, { timestamps: true })



const Blog = mongoose.model('Blog', blogSchema);
export default Blog
