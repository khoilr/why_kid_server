import otp from 'otp-generator';
import { NextFunction, Request, Response } from 'express'
import { IOTP, IOtpLogInReq, IOtpVerifiedReq, OTPModel } from '../../models/otp/otp';
import { EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID } from '../../helper/otp_config';

const OTP_TIME_OUT = 120 * 1000; // 60 seconds

const generateOtp = () => {
    return otp.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
}

const verify = (originOTP: string, userOTP: string) => {
    return originOTP === userOTP;
}

const validateEmail = (email: string) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const sendEmailOTP = async (params: {
    otp_code: string,
    email: string,
}) => {
    const { otp_code, email } = params;
    const respond = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            service_id: EMAILJS_SERVICE_ID,
            template_id: EMAILJS_TEMPLATE_ID,
            user_id: EMAILJS_PUBLIC_KEY,
            template_params: {
                otp_code: otp_code,
                to_email: email,
            }
        }),
    });
    console.log(`Send status: ${respond.status}`);
    return respond.status;
}
const sendSMSOTP = () => {

}

const loginWithOTP = async (req: Request, res: Response,) => {
    const body = req.body as IOtpLogInReq;
    if (!body) {
        return res.status(400).json({
            message: "Body bot found!"
        })
    }
    const { account } = body;
    const createdTime = Date.now();
    try {
        const newOtp = new OTPModel({
            account: account,
            session_id: `${createdTime}_${account}`,
            otp: generateOtp(),
            createdAt: createdTime,
            expired: createdTime + OTP_TIME_OUT,
        });
        await newOtp.save();
        // send otp to device
        if (validateEmail(newOtp.account)) {
            sendEmailOTP({ otp_code: newOtp.otp, email: newOtp.account });
        }

        return res.status(200).json({
            status: 200,
            msg: "OTP created successully",
            data: {
                account: newOtp.account,
                session_id: newOtp.session_id,
            }
        })
    } catch (error) {
        return res.status(400).json({
            status: 400,
            msg: 'Bad request',
            error
        })
    }
}
const verifyOTP = async (req: Request, res: Response) => {
    const body = req.body as IOtpVerifiedReq;
    if (!body) {
        return res.status(400).json({
            message: "Body bot found!"
        })
    }

    let msg = "";

    const otpRecord = await OTPModel.findOne({
        session_id: body.session_id,
    })
    msg = "OTP is not valid!";


    if (otpRecord) {
        // verify otp
        if (verify(otpRecord.otp, body.otp)) {
            const currentTime = Date.now();
            if (currentTime <= otpRecord.expired) {
                msg = "Verified successfully!";
                return res.status(200).json({
                    status: 200,
                    msg
                });
            } else {
                msg = "Your OTP is out of time";
            }
        }
    }

    return res.status(401).json({
        status: 401,
        msg,
    });
}

export {
    loginWithOTP,
    verifyOTP,
}