import User from "../../../database/models/User.js";

const sitemap_site = async(req, res) => {  

    try{
                const user =await User.find()
                return  res.status(200).json({ data: user[0].sitemap})
            
           
    }
    catch(e){
        return  res.status(400).json({error:e});

    }
   
 

}
export default sitemap_site;

