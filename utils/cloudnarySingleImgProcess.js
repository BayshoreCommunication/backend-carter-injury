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

export default deleteImageSingle;


