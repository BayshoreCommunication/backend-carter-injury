import User from "../../database/models/User.js";
const user_email =async  (req, res) => {
    const id = req.user._id.toString();
    const {email} = req.body
    try{
        
        const doc = await User.findOneAndUpdate({ _id: id },  {
            $set: {
                email:email
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
export default user_email;
