import User from "../../database/models/User.js";
const user_name = async (req, res) => {
    const id = req.user._id.toString();
    const {name} = req.body
   try{
                    const doc = await User.findOneAndUpdate({ _id: id },  {
                        $set: {
                            name:name
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
export default user_name;
