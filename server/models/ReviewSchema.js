import mongoose from 'mongoose';
import Doctor from './DoctorSchema.js';
import User from './UserSchema.js';

const reviewSchema = new mongoose.Schema(
    {
        doctor: {
            type: mongoose.Types.ObjectId,
            ref: 'Doctor',
            required: true
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        reviewText: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
            default: 0
        },
    },
    {
        timestamps: true
    }
)

reviewSchema.pre(/^find/, function(next){
    this.populate({
        path: "user",
        select: "name email"
    });

    next();
});

reviewSchema.statics.calcAverageRatings = async function(doctorId){

    const stats = await this.aggregate([{
        $match:{doctor:doctorId}
    },
    {
        $group:{
            _id: '$doctor',
            numOfRatings: {$sum: 1},
            avgRating:{$avg:'$rating'}
        }
    }
    ]);

    await Doctor.findByIdAndUpdate(doctorId, {
        totalRating: stats[0].numOfRatings,
        averageRating: stats[0].avgRating,
    });
};



reviewSchema.post('save', function(){
    this.constructor.calcAverageRatings(this.doctor);
});

export default mongoose.models.Review || mongoose.model('Review', reviewSchema);
