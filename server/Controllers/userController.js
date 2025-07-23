import User from '../Models/UserSchema.js';
import Appointment from '../models/BookingSchema.js';
import Doctor from '../models/DoctorSchema.js';

export const updateUser = async (req, res) => {
    const id = req.params.id;

    try {
        
        const updatedUser = await User.findByIdAndUpdate(id, {$set:req.body}, {new:true})

        // console.log(updatedUser, 'updatedUser')

        res.status(200).json({success:true, message: 'Successfully updated', data:updatedUser})
    } catch (err) {
        res.status(500).json({success:false, message:'Failed to update'})
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id).select('-password');

        res.status(200).json({success:true, message: 'Successfully deleted'})
    } catch (err) {
        res.status(500).json({success:false, message:'Failed to delete'})
    }
}

export const getSingleUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findByIdAndUpdate(id).select('-password');

        res.status(200).json({success:true, message: 'User found', data:user})
    } catch (err) {
        res.status(404).json({success:false, message:'No user found'})
    }
}

export const getAllUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.find({}).select('-password');

        res.status(200).json({success:true, message: 'Users found', data:user})
    } catch (err) {
        res.status(404).json({success:false, message:'Not found'})
    }
}

export const getUserProfile = async (req, res) => {
    const userId = req.userId;

    try{
        const user = await User.findById(userId)

        if(!user){
            return res.status(404).json({success:false, message:'User not found'})
        }

        const {password, ...rest} = user._doc

        res.status(200).json({success:true, message:'Profile info is getting', data:{...rest}})
    } catch (err){
        res.status(500).json({success:false, message:'Something went wrong'})
    }
}

export const getMyAppointments = async (req, res) => {
    try {
        //step 1 : retrieve appointments from booking
        const bookings = await Appointment.find({user:req.userId})

        //step 2 : extract doctor ids from appointment booking
        const doctorIds = bookings.map(e1 => e1.doctor.id);

        //step 3 : retrieve doctor details using doctor ids\
        const doctors = await Doctor.find({_id: { $in: doctorIds } }).select("-password");

        res.status(200).json({success:true, message:'Appointments are getting', data:doctors})

    } catch (err){
        res.status(500).json({success:false, message:'Something went wrong'})
    }
}

