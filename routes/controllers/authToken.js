
import User from "../../database/models/User.js";



const auth_token =async(req,res)=>{
    const id = req.user._id.toString();
    

    try{


        if(req.method == 'GET'){
            const user =await User.findOne({_id: id})
            return  res.status(200).json({ token: user.authToken})
        
        }
       if(req.method == 'POST'){
        const{authToken}=req.body;
        const doc = await User.findOneAndUpdate({ _id: id },  {
            $set: {
                authToken
            }
        }, {
            new: true
        });
    
        return res.status(200).json({ success: true })
    }
    
    }
    catch(e){
    return  res.status(400).json({ error: e })
    }
}
export default auth_token;


