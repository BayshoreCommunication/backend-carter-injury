import User from "../../../database/models/User.js";
import Media from "../../../database/models/Media.js";

const media_data_site = async(req, res) => {  

    try{
                const medium =await Media.find().sort({ createdAt: -1 })
                return  res.status(200).json({ data: medium})
            
           
    }
    catch(e){
        return  res.status(400).json({error:e});

    }
   
 

}
export default media_data_site;

