import User from "../../database/models/User.js";

export const robots =  async(req, res) => {
    const id = req.user._id.toString();
    const { robotTxt} = req.body



    try{
        const doc = await User.findOneAndUpdate({ _id: id },  {
            $set: {
                robotTxt:robotTxt
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



export const sitemap =  async(req, res) => {
    const id = req.user._id.toString();
    const { sitemap} = req.body



    try{
        const doc = await User.findOneAndUpdate({ _id: id },  {
            $set: {
                sitemap
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


export const canonical =  async(req, res) => {
    const id = req.user._id.toString();
    const { canonical} = req.body



    try{
        const doc = await User.findOneAndUpdate({ _id: id },  {
            $set: {
                canonical
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
