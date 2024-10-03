import Category from "../../database/models/Category.js";
const edit_category =  async(req, res) => {
    const id = req.user._id.toString();
    const { name,description,slug} = req.body
    const {category_id}=req.params



    try{
        const doc = await Category.findOneAndUpdate({ _id: category_id },  {
            $set: {
                name,description,slug
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
export default edit_category;
