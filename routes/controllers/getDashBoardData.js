import User from "../../database/models/User.js";
import Message from "../../database/models/Message.js";


export const user_dashboard = async (req, res) => {
  const id = req.user._id.toString();

  try {
    const user = await User.findById({ _id: id })
    // const sms = await Message.find({ _id: id })
/////messages will be calculated here
    if (user) {
        const currentDate = new Date(); 
        // const lastMonthDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1)); 
        const totalFound = await Message.find()
        const todayFound = await Message.find({
            createdAt:{$gte: new Date(Date.now() - 24*60*60*1000)},
          })
        const thisMonthFound = await Message.find({
          createdAt:{$gte: new Date(Date.now() - 30*24*60*60*1000)}
          })
          
      return res.status(200).json({
        data: {color:user.color, apiKey: user.apiKey,clientId:user.clientId,clientSecret:user.clientSecret,todayFound:todayFound.length,thisMonthFound:thisMonthFound.length,totalFound:totalFound.length}
      });

       }
    return res.status(400).json({ error: "user not found" });

  } catch (e) {
    return res.status(400).json({ error:e });
  }
};

export default user_dashboard;
