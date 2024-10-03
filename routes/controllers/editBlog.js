import Blog from "../../database/models/Blog.js";
const edit_blog = async (req, res) => {
    const id = req.user._id.toString();
    const { title,body,metaDescription,author,category,featuredImage,published,slug ,bodyImage} = req.body
    const {blog_id}=req.params
   



    try{
        const doc = await Blog.findOneAndUpdate({ _id: blog_id },  {
            $set: {
                title,body,metaDescription,author,category,featuredImage,published,slug,bodyImage
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
export default edit_blog;
