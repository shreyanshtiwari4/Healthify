import mongoose from 'mongoose';
import Review from './ReviewSchema.js';
import Appointment from './BookingSchema.js';

const DoctorSchema = new mongoose.Schema({
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
        type: String
    },
    photo: {
        type: String,
        default: 'https://res.cloudinary.com/shreyansharipur/image/upload/v1752412201/default-profile-pic_qlhe8z.webp'
    },
    ticketPrice: {
        type: Number
    },
    role: {
        type: String,
    },

    specialization: {
        type: String,
    },
    qualifications: {
        type: Array,
    },
    experiences: {
        type: Array,
    },
    bio: {
        type: String,
        maxLength: 50
    },
    about: {
        type: String
    },
    timeSlots: {
        type: Array
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    averageRating: {
        type: Number,
        default: 0
    },
    totalRating: {
        type: Number,
        default: 0
    },
    isApproved: {
        type: String,
        enum: ['pending', 'approved', 'cancelled'],
        default: 'pending'
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
);

export default mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);