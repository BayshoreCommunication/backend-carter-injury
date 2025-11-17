import Blog from "../../../database/models/Blog.js";

const blog_data_site = async (req, res) => {
  try {
    // Get page and limit from query params with defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Validate page and limit
    if (page < 1 || limit < 1 || limit > 100) {
      return res.status(400).json({
        error:
          "Invalid pagination parameters. Page must be >= 1 and limit must be between 1-100",
      });
    }

    const skip = (page - 1) * limit;

    // Get total count for pagination metadata
    const totalBlogs = await Blog.countDocuments();

    // Fetch paginated blogs
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalBlogs / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return res.status(200).json({
      data: blogs,
      pagination: {
        currentPage: page,
        totalPages,
        totalBlogs,
        limit,
        hasNextPage,
        hasPrevPage,
      },
    });
  } catch (e) {
    return res.status(400).json({ error: e.message || e });
  }
};
export default blog_data_site;
