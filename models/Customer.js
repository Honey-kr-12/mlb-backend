import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
  customerName: { type: String, required: true },
//   employeeId: { type: String, required: true },
  contactNo: { type: Number, min: 0 },
  quantity: { type: Number, min: 0 },
//   email: { type: Number, min: 0, required: true },
  price: { type: Number, min: 0 },
  productName:{},
  employeeAttendence: { type: Number, min: 0 },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
