import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, enum: ["30", "90", "ongoing"],default:"30"},
  status: { type: Boolean, default: true },
  rewardType: { type: String, enum: ["instant", "conversion"], required: true },
  rewardFormat: { type: String, enum: ["discount", "cash"], required: true },
  discountValue: { type: String, enum: ["20", "15", "25"], required: true },
  additionalNotes: { type: [String], default: [] },
  aiOptimization: { type: Boolean, default: true },
  message: { type: String, optional: true },
  selectedMessage: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true }, // Link to admin
  createdAt: { type: Date, default: Date.now },
});

const Campaign = mongoose.models?.Campaign || mongoose.model("Campaign", campaignSchema);
export default Campaign;