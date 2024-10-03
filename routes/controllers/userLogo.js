
import User from "../../database/models/User.js";
import Logo from "../../database/models/Logo.js";

const user_logo =  async(req, res) => {
    const id = req.user._id.toString();
    const {logo} = req.body
    try{
        
        const doc = await User.findOneAndUpdate({ _id: id },  {
            $set: {
                logo:logo
            }
        }, {
            new: true
        });

        const logoFound = await Logo.findOne({name:"logo"})


                    if(!logoFound){
                    const logoCreated = await Logo.create({
                        logo:logo,
                        name:"logo"
                    })
                    return res.status(200).json({ success: true })
                    }
                    
                    const logoUpdated = await Logo.findOneAndUpdate({ name:'logo' },  {
                        $set: {
                            logo:logo
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
export default user_logo;
