import createToken from "../../utils/createToken.js";
import User from "../../database/models/User.js";
import bcrypt from "bcryptjs";
 
 
 const user_login = async (req, res) => {
    const { email, password } = req.body;


    try {
        const user = await User.findOne({ email: email })

        
        if (user) {
         const match = await   bcrypt.compare(password, user.password)
            if (match) {
         
          const token = createToken(user._id)
                return res.status(200).json({ status: "success", token })
            }
            return res.status(400).json({ error: "Wrong password" })

        }
        else {
            return res.status(400).json({ error: "not found" })
        }

    } catch (e) {
      return  res.status(400).json({ error: "not found" })
    }

}

export default user_login;