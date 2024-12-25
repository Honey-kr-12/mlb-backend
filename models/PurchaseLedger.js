import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
  {
  purchase: { type: String, required: true },
  purchaseId: { type: String, required: true },
  quantity: { type: Number, min: 0 },
  pricing: { type: Number, min: 0 },
  //okok
  },
  { timestamps: true }
);

const Stock = mongoose.model("Stock", stockSchema);
export default Stock;
