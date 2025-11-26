import sharp from "sharp";
import axios from "axios";

/**
 * Converts an image URL to WebP format
 * @param {string} imageUrl - The original image URL
 * @returns {Promise<string>} - Base64 encoded WebP image data URL
 */
export const convertToWebP = async (imageUrl) => {
  try {
    if (!imageUrl) return null;

    // Download the image
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
