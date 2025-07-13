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
    }]
})

export default mongoose.models.User || mongoose.model('User', UserSchema);