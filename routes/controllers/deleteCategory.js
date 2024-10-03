import Category from "../../database/models/Category.js";
import User from "../../database/models/User.js";

const delete_category =  (req, res) => {
    const id = req.user._id.toString();
    const {category_id}=req.params
  Category.findByIdAndDelete({ _id: category_id })
    .then(user => console.log('deleted yes')).catch(err => res.status(422).json({ error: err }))
    
    User.findOne({_id: id}).then(user=>{
        const datas = user.categories.filter(categoryId => categoryId != category_id)
        user.categories = [...datas]
        user.save().then(saved => {
          return   res.status(200).json({ success: true }) 
            }
             )
    }).catch(e=>res.status(422).json({ error: err }))
    
    
}


export default delete_category;
