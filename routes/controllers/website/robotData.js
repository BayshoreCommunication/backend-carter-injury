import User from "../../../database/models/User.js";

const robots_site = async(req, res) => {  

    try{
                const user =await User.find()
                return  res.status(200).json({ data: user[0].robotTxt})
            
           
    }
    catch(e){
        return  res.status(400).json({error:e});

    }
   
 

}
export default robots_site;

