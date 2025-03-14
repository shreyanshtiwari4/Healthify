import express from 'express';
import { getAllReviews, createReview } from '../Controllers/reviewController.js';
import { authenticate,restrict } from '../auth/verifyToken.js';

const router = express.Router({mergeParams: true}); //this merge attributeds helps this to access parent route params i.e, doctor.js route params

// nested route will be used to achieve /doctor/doctorId/reviews

router.route('/').get(getAllReviews).post(authenticate, restrict(['patient']), createReview);

export default router;