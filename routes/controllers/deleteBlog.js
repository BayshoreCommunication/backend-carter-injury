import Blog from "../../database/models/Blog.js";
import User from "../../database/models/User.js";
// import deleteImageMultiple from "../../../utils/cloudnaryMultipleImgProcess.js";
// import deleteImageSingle from "../../../utils/cloudnarySingleImgProcess .js";
import { v2 as cloudinary } from 'cloudinary'
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

const deleteImageSingle =(image) =>{
    
    cloudinary.uploader.destroy(image.public_id, function(error, result) {
        if (error) {
          console.error('Failed to delete image:', error);
        } else {
          console.log('Image deleted successfully:', result);
        }
      });

}
const deleteImageMultiple=(images)=> {
    images.map((item)=>{
        cloudinary.uploader.destroy(item.image.public_id, function(error, result) {
            if (error) {
              console.error('Failed to delete image:', error);
            } else {
              console.log('Image deleted successfully:', result);
            }
          });

    })
}

const delete_blog = async (req, res) => {
    const id = req.user._id.toString();
    const {blog_id}=req.params

    try{
        const blog = await Blog.findById(blog_id);
        blog.featuredImage?deleteImageSingle(blog.featuredImage.image):''
        blog.bodyImage?deleteImageMultiple(blog.bodyImage):''

        const result = await Blog.findByIdAndDelete({ _id: blog_id });

        const user = await User.findOne({_id: id})
        const datas = user.blogs.filter(blogId => blogId != blog_id)
        user.blogs = [...datas]
        await user.save();

        return res.status(200).json({ data: "success" });

    }
    catch(e){
        return res.status(400).json({ error: "something wrong" });

    }
    

    
    
    
}


export default delete_blog;


