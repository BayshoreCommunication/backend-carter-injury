import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: 1 * 24 * 60 * 60,
  });
};
export default createToken;
