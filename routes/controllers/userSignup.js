import createToken from "../../utils/createToken.js";
import User from "../../database/models/User.js";
import bcrypt from "bcryptjs";
export const user_signup = async (req, res) => {

    const { email, password } = req.body;

    try {
      // return res.status(400).json({ error: "Can not be more than one user" });

      const found = await User.find();
      // return res.status(400).json({ error: found.length });

      if(found.length  == 1){
        return res.status(400).json({ error: "Can not be more than one user" });

      }

      const user = await User.findOne({ email: email });
  
      if (user) {
        return res.status(400).json({ status: "Already exists" });
      }
      if(password.length < 6){
        return res.status(400).json({ status: "password should be at least 6 characters" });

      }
      const hashed_password = await bcrypt.hash(password, 7);
      const userCreated = await User.create({
        email,
        password: hashed_password,
      });
      return res.status(200).json({ user: "success" });
    } catch (e) {
      return res.status(400).json({ error: "something wrong" });
    }
  };
  
  export default user_signup;