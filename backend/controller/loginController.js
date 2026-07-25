//external modules
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");

//internal modules
const database = require("../models/database");

//router handling functions

//user signup

exports.signUp = [
  check("name")
    .notEmpty()
    .withMessage("Name field cannot be empty")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name cannot contain speacial characters"),

  check("email")
    .notEmpty()
    .withMessage("email field cannot be empty")
    .isEmail()
    .withMessage("Enter a valid email id"),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password should have at least 8 characters")
    .matches(/[a-z]/)
    .withMessage("password should have lower case")
    .matches(/[A-Z]/)
    .withMessage("password should have upper case")
    .matches(/[0-9]/)
    .withMessage("password should have digits")
    .matches(/[^a-zA-Z0-9]/)
    .withMessage("password should have special characters"),
  async (req, res, next) => {
    const errors = validationResult(req);

    formattedError = {
      name: null,
      email: null,
      password: null,
    };

    if (!errors.isEmpty()) {
      errors.array().forEach((err) => {
        if (!formattedError[err.path]) {
          formattedError[err.path] = err.msg;
        }
      });
      return res.status(400).json({
        success: false,
        message: formattedError,
      });
    }
    if (errors.isEmpty()) {
      try {
        const { name, email, password } = req.body;
        const user = await database.findOne({ email: email });
        if (user) {
          return res.status(409).json({
            success: false,
            validationError:false,
            message: "user already exists",
          });
        } else {
          req.session.userDetails = { name, email, password };
          const otp = otpGenerator();
          try {
            req.session.otp = otp;
            await req.session.save();
            await sendOTP(email, otp);
            return res.status(201).json({
              success: true,
              message: "Otp is sent to the email please check the jmail",
            });
          } catch {
            console.log(err);
            return res.status(500).json({
              success: false,
              validationError:false,
              message:
                "Error occurred while sending the email please try again ",
            });
          }
        }
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          validationError:false,
          message: "Internal server error",
        });
      }
    }
  },
];

//user login for account

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await database.findOne({ email: email });
    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.isLoggedIn = true;
      await req.session.save();
      return res.status(200).json({
        success: true,
        message: "Successfully logged in",
      });
    } else {
      return res.status(500).json({
        success: false,
        validationError:false,
        message: "Unauthorized access please sign up first",
      });
    }
  } catch (err) {
    return res.status(201).json({
      success: false,
      validationError:false,
      message: "Error occured try again later",
    });
  }
};

//otp generator
const otpGenerator = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

//OTP sender by resend

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const sendOTP = async (email, otp) => {
  try {
    const response = await transporter.sendMail({
      from: `"NexTalk" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your NexTalk Account",

      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          
          <h2 style="color: #2563eb; text-align: center;">
            NexTalk
          </h2>

          <p>Hello,</p>

          <p>
            Thank you for signing up for <strong>NexTalk</strong>.
          </p>

          <p>
            Your One-Time Password (OTP) is:
          </p>

          <h1 style="text-align: center; color: #2563eb; letter-spacing: 5px;">
            ${otp}
          </h1>

          <p>
            This OTP is valid for <strong>5 minutes</strong>.
          </p>

          <p>
            If you didn't request this verification, you can safely ignore this email.
          </p>

          <hr>

          <p style="font-size: 12px; color: #666; text-align: center;">
            © ${new Date().getFullYear()} NexTalk. All rights reserved.
          </p>

        </div>
      `,
    });

    return response;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};

//otp page handler

exports.otp = async (req, res, next) => {
  try {
    const otp = req.body.otpStr;
    if (otp != req.session.otp) {
      return res.status(500).json({
        success: false,
        message: "Wrong otp",
      });
    }
    const {name,email,password:pass} = req.session.userDetails;
    const password = await bcrypt.hash(pass, 12);
    const details = new database({ name, email, password });
    req.session.isLoggedIn = true;
    await req.session.save();
    await details.save();
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(201).json({
      success: false,
      message: "Error occurred while signing in please try again later",
    });
  }
};



//logout

exports.logout = (req,res,next)=>{
  if(req.session.isLoggedIn){
    req.session.isLoggedIn = false;
  }
}