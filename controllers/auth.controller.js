import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import accountCreationTemplate from "../mailTemplate/accountCreation.js";
import emailSender from "../utils/mail.js";
import otpGenerator from "otp-generator";
import OTP from "../models/otp.model.js";
const generateTicketNumber = () => {
  return Math.floor(1000000 + Math.random() * 9000000).toString();
};

const generateUniqueTicketNumber = async () => {
  let unique = false;
  let ticketNumber;

  while (!unique) {
    ticketNumber = generateTicketNumber();
    const existingComplaint = await User.findOne({ ticketNumber });
    if (!existingComplaint) {
      unique = true;
    }
  }

  return ticketNumber;
};

export const sendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (await User.findOne({ email })) {
      return res.status(401).json({
        error: "Email already exists",
      });
    }

    const options = {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    };
    let otp = "";
    let user;

    do {
      otp = otpGenerator.generate(6, options);
      user = await OTP.findOne({ otp });
    } while (user);

    const otpObj = await OTP.create({ email, otp });

    res.status(200).json({
      success: true,
      data: "OTP sent successfully",
    });
  } catch (err) {
    //console.log(err);
  }
};

export const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      otp,
    } = req.body;

    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    //console.log(recentOtp);

    if (recentOtp.length === 0 || otp !== recentOtp[0].otp) {
      return res.status(400).json({
        error: "OTP is not valid. Please try again",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate a unique companyId
    const companyId = await generateUniqueTicketNumber();
    // const companyId = uuidv4();

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      companyId,
    });

    if (newUser) {
      // Generate JWT token
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "365d",
      });
      await newUser.save();

      try {
        emailSender(
          email,
          `Account created successfully for ${firstName} ${lastName}`,
          accountCreationTemplate(firstName + " " + lastName)
        );
      } catch (emailError) {
        //console.log("Error sending email:", emailError.message);
      }

      res.status(201).json({
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        companyId: newUser.companyId,
        role: newUser.role,
        token,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    //console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
    try {
        //console.log("login controller");
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }

        const user = await User.findOne({ email: email })

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        // //console.log(user)

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // generateTokenAndSet(user._id, res);
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "365d",
        });

        res.status(200).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            companyId: user.companyId,
            role: user.role,
            token
        });
    } catch (error) {
        //console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const logout = (req, res) => {
  console.log("okok");
  try {
    
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    //console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};