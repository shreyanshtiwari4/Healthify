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
        type: String
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
    bloodTpe: {
        type: String
    },
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appoinment'
    }]
})

export default mongoose.model('User', UserSchema);