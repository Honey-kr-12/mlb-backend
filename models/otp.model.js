import mongoose from 'mongoose';
import emailSender from '../utils/mail.js';
import emailOtpTemplate from '../mailTemplate/emailOtpTemplate.js';

const OTPSchema = new mongoose.Schema({
  otp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '10m',
  },
});

const sendOtpEmail = async (toEmail, otp) => {
  try {
    const mailResponse = await emailSender(toEmail, 'Verification Email from mlb', emailOtpTemplate(otp));
  } catch (err) {
    throw err;
  }
};


OTPSchema.post('save', async function (doc) {
  await sendOtpEmail(this.email, this.otp);
});

const OTP = mongoose.model('OTP', OTPSchema);

export default OTP;
