import Blog from "../../../database/models/Blog.js";

const blog_detail_site = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({ error: "Blog slug is required" });
    }

    // Find blog by slug
    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    return res.status(200).json({ data: blog });
  } catch (e) {
    return res.status(400).json({ error: e.message || e });
  }
};

export default blog_detail_site;
