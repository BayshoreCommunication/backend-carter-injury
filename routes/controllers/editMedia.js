
import User from "../../database/models/User.js";
import Media from "../../database/models/Media.js";



const edit_media =async(req,res)=>{
    const id = req.user._id.toString();
    const { imageTitle,altText} = req.body
    const{media_id}=req.params;

    try{
        const doc = await Media.findOneAndUpdate({ _id: media_id },  {
            $set: {
              imageTitle,altText
            }
        }, {
            new: true
        });
    
        return res.status(200).json({ success: true })
    
    }
    catch(e){
    return  res.status(400).json({ error: e })
    }
}
export default edit_media;


