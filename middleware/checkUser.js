import jwt from "jsonwebtoken";
import User from "../database/models/User.js";


const checkUser = (req, res, next) => {
  // return res.status(200).json({success:'You must Be logged in'});

  const jwtKey = process.env.JWT_KEY;
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ success: "You must Be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, jwtKey, async (err, payload) => {
    if (err) {
      return res.status(401).json({ authorization: err, jwtKey: jwtKey });
    }

    const { id } = payload;
    const user = (await User.findById(id)) || (await Admin.findById(id));
    if (user) {
      req.user = user;
      next();
    }
  });
};

export default checkUser;
