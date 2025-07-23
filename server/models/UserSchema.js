import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    photo: {
        type: String,
        default: 'https://res.cloudinary.com/shreyansharipur/image/upload/v1752412201/default-profile-pic_qlhe8z.webp'
    },
    role: {
        type: String,
        enum: ['patient', 'admin'],
        default: 'patient',
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'male'
    },
    bloodType: {
        type: String
    },
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }],
            verifyOtp: {
            type: String,
            default:"",
        },
        verifyOtpExpireAt:{
            type: Number,
            default:0,
        },
        isAccountVerified: {
            type:Boolean,
            default:false,
        },
        resetOtp:{
            type: String,
            default: '',
        },
        resetOtpExpireAt: {
            type: Number,
            default:0
        },
    },
    {timestamps:true}
)

export default mongoose.models.User || mongoose.model('User', UserSchema);