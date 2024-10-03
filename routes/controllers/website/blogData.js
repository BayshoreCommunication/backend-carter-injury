import User from "../../../database/models/User.js";
import Blog from "../../../database/models/Blog.js";

const blog_data_site = async(req, res) => {

    try{
                const blogs =await Blog.find().sort({ createdAt: -1 })
                return  res.status(200).json({ data: blogs})
            
           
    }
    catch(e){
        return  res.status(400).json({error:e});

    }
   
 

}
export default blog_data_site;
