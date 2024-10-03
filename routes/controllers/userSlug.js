import User from "../../database/models/User.js";
import Blog from "../../database/models/Blog.js";

const user_slug =async(req,res)=>{
    const id = req.user._id.toString();
const {slug}=req.params

try{
    const blog = await Blog.findOne({slug:slug})
    return  res.status(200).json({ success: blog})

}
catch(e){
    return  res.status(400).json({error:e});

}

}

export default user_slug;
