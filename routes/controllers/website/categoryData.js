import Category from "../../../database/models/Category.js";

const category_data_site = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    return res.status(200).json({ data: categories });
  } catch (e) {
    return res.status(400).json({ error: e });
  }
};

export default category_data_site;
