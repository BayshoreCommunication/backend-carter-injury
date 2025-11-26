import Blog from "../../../database/models/Blog.js";
import { convertImageObjectToWebP, convertHtmlImagesToWebP } from "../../../utils/imageConverter.js";

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

    // Convert blog to object
    const blogObj = blog.toObject();

    // Convert featured image to WebP
    if (blogObj.featuredImage && blogObj.featuredImage.image) {
      blogObj.featuredImage.image = await convertImageObjectToWebP(
        blogObj.featuredImage.image
      );
    }

    // Convert all images in body HTML to WebP
    if (blogObj.body) {
      blogObj.body = await convertHtmlImagesToWebP(blogObj.body);
    }

    return res.status(200).json({ data: blogObj });
  } catch (e) {
    return res.status(400).json({ error: e.message || e });
  }
};

export default blog_detail_site;
