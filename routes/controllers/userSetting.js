import User from "../../database/models/User.js";


export const user_setting = async (req, res) => {
  const id = req.user._id.toString();

  try {
    const user = await User.findById({ _id: id })
    // const sms = await Message.find({ _id: id })
/////messages will be calculated here
    if (user) {
      return res.status(200).json({ data:
        { name: user.name,image:user.image,color:user.color,email:user.email,logo:user.logo}}
        
        );
    }
    return res.status(400).json({ error: "user not found" });

  } catch (e) {
    return res.status(400).json({ error: "something wrong" });
  }
};

export default user_setting;
