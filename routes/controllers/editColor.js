import User from "../../database/models/User.js";
const edit_color =  async(req, res) => {
    const id = req.user._id.toString();
    const { color} = req.body



    try{
        const doc = await User.findOneAndUpdate({ _id: id },  {
            $set: {
                color            }
        }, {
            new: true
        });
    
        return res.status(200).json({ success: true })
    
    }
    catch(e){
    return  res.status(400).json({ error: e })
    }
   

}
export default edit_color;
