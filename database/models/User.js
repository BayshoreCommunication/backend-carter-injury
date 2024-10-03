import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
    },
    password: {
        type: String,
        trim: true,
      },  


    name: {
      type: String,
    },
    color: {
        type: String,
      },
      authToken: {
        type: String,
      },
    logo: { type: String },
    apiKey: { type: String },  
    clientId: { type: String},

    canonical: { type: String },
    sitemap: { type: String },
    robotTxt: { type: String},

    clientSecret: { type: String },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,

        ref: "Blog",
      },
    ],
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,

        ref: "Category",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,

        ref: "Message",
      },
    ],
    medias: [
      {
        type: mongoose.Schema.Types.ObjectId,

        ref: "Media",
      },
    ],
    

 
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
