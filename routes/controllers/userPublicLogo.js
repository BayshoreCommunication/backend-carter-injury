import Logo from "../../database/models/Logo.js";


const user_public_logo= async(req,res)=>{


    try{
        const logoFound = await Logo.findOne({name:"logo"})
        if(logoFound){
            return res.status(200).json({ success: logoFound })

        }
        return res.status(400).json({ error: "something wrong" });


    }
    catch(e){
    return res.status(400).json({ error: "something wrong" });

    }

}

export default user_public_logo;
