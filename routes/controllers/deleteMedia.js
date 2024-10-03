import User from "../../database/models/User.js";
import Media from "../../database/models/Media.js";

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

const delete_media = async (req, res) => {
    const id = req.user._id.toString();
    const {media_id}=req.params

    try{
        const media = await Media.findById(media_id);
        media?deleteImageSingle(media.image):''

        const result = await Media.findByIdAndDelete({ _id: media_id });

        const user = await User.findOne({_id: id})
        const datas = user.medias.filter(mediaId => mediaId != media_id)
        user.medias = [...datas]
        await user.save();

        return res.status(200).json({ data: "success" });

    }
    catch(e){
        return res.status(400).json({ error: "something wrong" });

    }
    

    
    
    
}


export default delete_media;


