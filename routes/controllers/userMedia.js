import User from "../../database/models/User.js";
import Media from "../../database/models/Media.js";
import Blog from "../../database/models/Blog.js";

const media_data = async(req, res) => {
    const id = req.user._id.toString();   


    try{
            if(req.method == 'GET'){
              const media =await Media.find().sort({ createdAt: -1 })
              return  res.status(200).json({media})
            }
            
           if(req.method == 'POST'){
            const {image, imageTitle,altText } = req.body
            const user = await User.findOne({ _id: id })
            const mediaCreated = await Media.create({
                image,
                imageTitle,
                altText,
                user:id
              });
              user.medias.push(mediaCreated._id);
              await user.save();
        
              return  res.status(200).json({ success: 'Created Successfully'})
           }
    }
    catch(e){
        return res.status(400).json({ error: "something wrong" });

    }
   
 

}
export default media_data;
