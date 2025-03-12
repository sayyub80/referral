import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" }, // Role is always "admin"
  createdAt: { type: Date, default: Date.now },
});

const Admin= mongoose.models?.Admin || mongoose.model("Admin", adminSchema);
export default Admin;