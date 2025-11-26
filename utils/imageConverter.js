import sharp from "sharp";
import axios from "axios";

/**
 * Converts an image URL to WebP format
 * @param {string} imageUrl - The original image URL
 * @returns {Promise<string>} - Base64 encoded WebP image data URL or modified Cloudinary URL
 */
export const convertToWebP = async (imageUrl) => {
  try {
    if (!imageUrl) return null;

    // Check if it's a Cloudinary URL
    if (imageUrl.includes('cloudinary.com')) {
      // For Cloudinary URLs, modify the URL to force WebP format
      // This changes the format and filename extension
      let webpUrl = imageUrl;

      // Add f_webp transformation if not already present
      if (!imageUrl.includes('f_webp')) {
        // Find the upload/ part and insert transformation after it
        webpUrl = imageUrl.replace('/upload/', '/upload/f_webp,q_80/');
      }

      // Change file extension to .webp
      webpUrl = webpUrl.replace(/\.(jpg|jpeg|png|avif|gif|bmp|tiff|webp)$/i, '.webp');

      return webpUrl;
    }

    // For non-Cloudinary URLs, download and convert
    const response = await axios({
      url: imageUrl,
      responseType: "arraybuffer",
      timeout: 10000,
    });

    // Convert to WebP using sharp
    const webpBuffer = await sharp(response.data)
      .webp({ quality: 80 })
      .toBuffer();

    // Convert to base64 data URL
    const base64Image = webpBuffer.toString("base64");
    return `data:image/webp;base64,${base64Image}`;
  } catch (error) {
    console.error("Error converting image to WebP:", error.message);
    // Return original URL if conversion fails
    return imageUrl;
  }
};

/**
 * Converts image object with URL to WebP format
 * @param {Object} imageObj - Image object with url property
 * @returns {Promise<Object>} - Updated image object with WebP URL
 */
export const convertImageObjectToWebP = async (imageObj) => {
  if (!imageObj || !imageObj.url) return imageObj;

  const webpUrl = await convertToWebP(imageObj.url);
  return {
    ...imageObj,
    url: webpUrl,
  };
};

/**
 * Converts all image URLs in HTML content to WebP format
 * @param {string} htmlContent - HTML string containing img tags
 * @returns {Promise<string>} - HTML with all image URLs converted to WebP
 */
export const convertHtmlImagesToWebP = async (htmlContent) => {
  if (!htmlContent || typeof htmlContent !== 'string') return htmlContent;

  // Find all img tags with src attributes
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;

  let updatedHtml = htmlContent;
  const matches = [...htmlContent.matchAll(imgRegex)];

  // Process each image URL
  for (const match of matches) {
    const fullImgTag = match[0];
    const originalUrl = match[1];

    // Convert the URL to WebP
    const webpUrl = await convertToWebP(originalUrl);

    // Replace the URL in the img tag
    const updatedImgTag = fullImgTag.replace(originalUrl, webpUrl);
    updatedHtml = updatedHtml.replace(fullImgTag, updatedImgTag);
  }

  return updatedHtml;
};
