import mongoose from "mongoose";

const assistantDataSchema = new mongoose.Schema({
  websiteUrl: String, // optional
  fileId: String, // from OpenAI file upload
  fileName: String,
  assistantId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AssistantData = mongoose.model("AssistantData", assistantDataSchema);
export default AssistantData;
