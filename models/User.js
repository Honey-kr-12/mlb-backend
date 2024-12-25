import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    companyId: {
        type: String,
        required: true,
        unique: true,
      },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^([\w-]+(?:\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7})$/, 'Please provide a valid email address'],
    },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true, match: [/^\d{10}$/, 'Please provide a valid phone number'] },
    role: { type: String, enum: ['user', 'admin', 'employee'], default: 'user' },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
