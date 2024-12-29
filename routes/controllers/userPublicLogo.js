import Logo from "../../database/models/Logo.js";
import User from "../../database/models/User.js";

const user_public_logo = async (req, res) => {
  try {
    const logoFound = await Logo.findOne({ name: "logo" });
    const user = await User.find();
    if (logoFound) {
      return res
        .status(200)
        .json({ data: { success: logoFound, color: user[0].color } });
    }
    return res.status(400).json({ error: "something wrong" });
  } catch (e) {
    return res.status(400).json({ error: "something wrong" });
  }
};

export default user_public_logo;
