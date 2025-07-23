import User from '../Models/UserSchema.js';
import Doctor from '../models/DoctorSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import transporter from '../lib/nodemailer.js';

const generateToken = (user) => {
    return jwt.sign({
        id: user._id,
        role: user.role, 
    }, process.env.JWT_SECRET_KEY);
}

export const register = async (req, res) => {

    const {email, password, name, role, photo, gender} = req.body;

    try {

        let user = null;
        

        if(role == 'patient'){
            user = await User.findOne({email});
        }
        if(role == 'doctor'){
            user = await Doctor.findOne({email});
        }

        if(user){
            return res.status(400).json({message: 'User already exists'});
        }

        const salt = await bcrypt.genSalt(10); //this is basically the key
        const hashPassword = await bcrypt.hash(password, salt);
        const otp = String(Math.floor(100000 + Math.random() * 900000));

        if(role == 'patient'){
            user = new User({
                name,
                email,
                password: hashPassword,
                photo, 
                gender,
                role,
                verifyOtp:otp,
                verifyOtpExpireAt:Date.now() + 10 * 60 * 1000
            })
        }

        if(role == 'doctor'){
            user =  new Doctor({
                name,
                email,
                password: hashPassword,
                photo, 
                gender,
                role,
                verifyOtp:otp,
                verifyOtpExpireAt:Date.now() + 10 * 60 * 1000
            })
        }

        if(user){
            
            const mailOptions = {
                from: process.env.SENDER_MAIL,
                to: email,
                subject: 'Account verification mail',
                text:`Your otp for account verification is ${otp}. Verification of account is necessary to login. This otp will expire after 10 minutes.`
            }

            await transporter.sendMail(mailOptions);
            await user.save();

            return res.status(201).json({
                success: true,
                message: "OTP sent successfully for account verification.",
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                profilePic: user.profilePic,
                expiryTime: 600
            });

        }
        else{
            return res.status(400).json({ success: false, message: "Invalid user data" })
        }

    }catch (err) {
        console.error('Error during registration:', err.message);
        res.status(500).json({success:false, message: 'Internal server error'});
    }
}

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        let user = null

        const patient = await User.findOne({email});
        const doctor = await Doctor.findOne({email});

        if(patient){
            user = patient
        }
        if(doctor){
            user = doctor
        }

        if(!user){
            return res.status(404).json({message:'User not found'});
        }

        //now if the user exist comparing the password
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

        if(!isPasswordMatch){
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const token = generateToken(user);

        const {password, role, appointments, ...rest} = user._doc

        res.status(200).json({success: true, message:"Successfully login", token, data:{...rest}, role });

    }catch (err) {
        res.status(500).json({success:false, message: 'Failed to login'});
    }
}

export const sendVerifyOTP = async (req, res) => {
    try {
        const {email, role} = req.body;
        if(!email || !role){
            return res.status(400).json({success: false, message: "Missing details"});
        }
        if(role !== 'patient' && role !== 'doctor'){
            return res.status(400).json({success: false, message: "Invalid role"});
        }
        let user = null;
        if(role == 'Patient'){
            user = await User.findOne({email});
        }
        if(role == 'Doctor'){
            user = await Doctor.findOne({email});
        }

        if(!user){
            return res.status(400).json({success: false, message: "No user found"})
        }

        if (user.isAccountVerified) {
            return res.status(200).json({ success: true, message: "Account already verified" })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000;

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_MAIL,
            to: user.email,
            subject: 'Account verification mail',
            text:`Your otp for account verification is ${otp}. Verification of account is necessary to login. This otp will expire after 10 minutes.`

        }

        await transporter.sendMail(mailOptions)

        return res.json({ success: true, message: `Verification OTP sent on email ${user.email}` });


    } catch (error) {
        console.log("Error in verifyOTP controller",error.message)
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const verifyEmail = async (req, res) => {
    try {
        const { email,role, otp } = req.body;
        if(!email || !otp || !role){
            return res.status(400).json({success: false, message: "Missing details"});
        }
        let user = null;
        if(role === 'patient'){
            user = await User.findOne({email});
        }
        if(role === 'doctor'){
            user = await Doctor.findOne({email});
        }
        if(!user){
            return res.status(400).json({success: false, message: 'User not found'});
        }
        if(user.isAccountVerified) return res.status(200).json({success: true, message:'Account already verified'})
        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: "OTP Expired" })
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;
        await user.save();

        return res.json({ success: true, message: "Email verified successfully" })
    } catch (error) {
        console.log("Error in verifying otp",error.message);
        return res.status(500).json({ success: false, message: 'Internal server error' });

    }
}