import { Router } from 'express'
import { loginWithOTP, verifyOTP } from '../../controllers/otp/otp';

const OTPRouter = Router();

OTPRouter.post('/', loginWithOTP);
OTPRouter.post('/verify', verifyOTP);

export default OTPRouter;