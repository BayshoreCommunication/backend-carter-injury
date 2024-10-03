import User from "../../database/models/User.js";
import Message from "../../database/models/Message.js";

const user_messages = async(req, res) => {

  

    try{
        if(req.method == 'GET'){
            const messages =await Message.find().sort({ createdAt: -1 })
            return res.status(200).json({ data: messages})  
        
        }
       if(req.method == 'POST'){
        const { name,email,phone,message} = req.body
        const categoryCreated = await Message.create({
            name,email,phone,message
          });
         
    
          return  res.status(200).json({ success: 'Created Successfully'})
       }
}
catch(e){
    return  res.status(400).json({ error: e })

}

 

}
export default user_messages;
