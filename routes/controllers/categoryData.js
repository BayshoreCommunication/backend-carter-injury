import User from "../../database/models/User.js";
import Category from "../../database/models/Category.js";

const category_data = async(req, res) => {
    const id = req.user._id.toString();

    try{
            if(req.method == 'GET'){
                const blogs =await Category.find({user: id}).sort({ createdAt: -1 })
            return    res.status(200).json({ data: blogs})
            
            }
           if(req.method == 'POST'){
            const { name,description,slug } = req.body
            const user = await User.findOne({ _id: id })
            const categoryCreated = await Category.create({
                name,
                description,
                slug,
                user:id
              });
              user.categories.push(categoryCreated._id);
              await user.save();
        
          return  res.status(200).json({ success: 'Created Successfully'})
           }
    }
    catch(e){
        return res.status(400).json({ error: "something wrong" });

    }
   
 

}
export default category_data;
