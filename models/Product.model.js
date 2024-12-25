import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
goodServicesDate: { type: Date, required: true },
companyId: {
  type: String,
  required: true,
  unique: true,
},
  purchaserName: { type: String, required: true },
  goodsServicesName: { type: String, required: true },
  quantity: { type: Number, min: 0 },
  amount: { type: Number, min: 0 },
  gst: { type: Number, min: 0, required: true },
  amountPaid: { type: Number, min: 0 },
  amountPending: { type: Number, min: 0 },
  paymentMode: { type: String, required: true },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
