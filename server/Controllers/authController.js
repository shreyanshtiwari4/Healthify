import User from '../Models/UserSchema.js';
import Doctor from '../Models/DoctorSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

        if(role == 'patient'){
            user = new User({
                name,
                email,
                password: hashPassword,
                photo, 
                gender,
                role
            })
        }

        if(role == 'doctor'){
            user =  new Doctor({
                name,
                email,
                password: hashPassword,
                photo, 
                gender,
                role
            })
        }

        await user.save();

        res.status(200).json({success:true, message: 'User created successfully'});

    }catch (err) {
        console.error('Error during registration:', err.message);
        res.status(500).json({success:false, message: 'Internal server error, please try again'});
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