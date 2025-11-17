import express from "express";
const router = express.Router();

///   middleware  ///////

import checkUser from "../middleware/checkUser.js";

import exchangeToken from "./controllers/exchangeToken.js";

//////   file import for api ///////////   admin import   ////////////////////
import auth_token from "./controllers/authToken.js";
import user_dashboard from "./controllers/getDashBoardData.js";
import user_login from "./controllers/userLogin.js";
import user_signup from "./controllers/userSignup.js";

import blog_data from "./controllers/blogData.js";
import category_data from "./controllers/categoryData.js";
import media_data from "./controllers/userMedia.js";

import delete_blog from "./controllers/deleteBlog.js";
import delete_category from "./controllers/deleteCategory.js";
import delete_media from "./controllers/deleteMedia.js";
import edit_blog from "./controllers/editBlog.js";
import edit_category from "./controllers/editCategory.js";
import edit_color from "./controllers/editColor.js";
import edit_media from "./controllers/editMedia.js";
import user_setting from "./controllers/userSetting.js";

import user_public_logo from "./controllers/userPublicLogo.js";
import user_slug from "./controllers/userSlug.js";

import {
  canonical,
  robots,
  sitemap,
} from "./controllers/robotSitemapCanonical.js";

import user_messages from "./controllers/userMessages.js";

import user_email from "./controllers/userEmail.js";
import user_logo from "./controllers/userLogo.js";
import user_name from "./controllers/userName.js";
import user_password from "./controllers/userPassword.js";

import send_email from "./controllers/sendEmail.js";
import user_otp_once from "./controllers/userOtp.js";
import user_otp_check_and_set_password from "./controllers/userOtpCheckAndSetPassword.js";

import auth_google from "./controllers/authGoogle.js";
import auth_google_callback from "./controllers/authGoogleCallback.js";
import get_console_data from "./controllers/getConsoleData.js";

///////////  all routes for admin       /////////////////////

////login and signup
router.post("/user/login", user_login);
router.post("/user/signup", user_signup);

///////  google auth api /////
router.get("/auth/google", checkUser, auth_google);
router.post("/token/save", auth_google_callback);
router.post("/get/google/consoleData", get_console_data);

// handle tokens from here
router.all("/exchange-token", exchangeToken);

//////   create and get blog and category and media //////////
router.all("/blog", checkUser, blog_data);
router.all("/category", checkUser, category_data);
router.all("/media", checkUser, media_data);
router.all("/user/token", checkUser, auth_token);

//////   edit and delete    blog and category///////
router.post("/media/delete/:media_id", checkUser, delete_media);
router.post("/blog/edit/:blog_id", checkUser, edit_blog);
router.post("/blog/delete/:blog_id", checkUser, delete_blog);
router.post("/category/edit/:category_id", checkUser, edit_category);
router.post("/category/delete/:category_id", checkUser, delete_category);
router.post("/media/edit/:media_id", checkUser, edit_media);
router.post("/color/edit", checkUser, edit_color);

router.post("/user/robots", checkUser, robots);
router.post("/user/sitemap", checkUser, sitemap);
router.post("/user/canonical", checkUser, canonical);

////////   get data dashboard  messages setting //////
router.get("/user/dashboard", checkUser, user_dashboard);
router.get("/user/setting", checkUser, user_setting);
router.get("/user/single/:slug", checkUser, user_slug);

////   settings page post edit api   /////////

router.post("/user/change/logo", checkUser, user_logo);
router.post("/user/change/name", checkUser, user_name);
router.post("/user/change/email", checkUser, user_email);
router.post("/user/change/password", checkUser, user_password);

////////     otp  api  //////  user_otp_check_and_set_password

router.post("/user/otp/once", checkUser, user_otp_once);
router.post(
  "/user/otp/checkandsetpass",
  checkUser,
  user_otp_check_and_set_password
);
router.post("/email/sent/check", checkUser, send_email);

//////////////////// public logo //////////
router.get("/user/public/logo", user_public_logo);

///////////  all routes for admin     //////////////////////////////

///////////////// website import    ///////////////////////////

import canonical_site from "./controllers/website/canonicalData.js";
import robots_site from "./controllers/website/robotData.js";
import sitemap_site from "./controllers/website/sitemapData.js";

import blog_data_site from "./controllers/website/blogData.js";
import blog_detail_site from "./controllers/website/blogDetailData.js";
import category_data_site from "./controllers/website/categoryData.js";
import media_data_site from "./controllers/website/mediaData.js";

///////////  all routes for website  //////////////////////////////

router.get("/site/blog", blog_data_site);
router.get("/site/blog/:slug", blog_detail_site);
router.get("/site/category", category_data_site);
router.get("/site/media", media_data_site);
router.all("/user/messages", user_messages); //// for post request { name,email,phone,message}   should be sent  ////////

router.get("/site/robots", robots_site);
router.get("/site/sitemap", sitemap_site);
router.get("/site/canonical", canonical_site);

export default router;
