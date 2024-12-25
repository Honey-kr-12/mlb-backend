import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
  employeeName: { type: String, required: true },
  employeeId: { type: String, required: true },
  contactNo: { type: Number, min: 0 },
  amount: { type: Number, min: 0 },
  email: { type: Number, min: 0, required: true },
  employeeSalary: { type: Number, min: 0 },
  employeeAttendence: { type: Number, min: 0 },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
