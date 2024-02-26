import { Schema, model } from 'mongoose'

interface IOTP {
    account: string
    otp: string
    expired: number
    session_id: string,
    createdAt: number,

}

interface IOtpLogInReq {
    account: string,
}

interface IOtpVerifiedReq {
    session_id: string,
    otp: string,
}

const OTPSchema = new Schema<IOTP>(
    {
        account: { type: String, required: true },
        otp: { type: String, required: true },
        createdAt: { type: Number, required: true },
        expired: { type: Number, required: true },
        session_id: { type: String, required: true },
    },

)

const OTPModel = model<IOTP>('otp', OTPSchema)

export { OTPModel, IOTP, IOtpLogInReq, IOtpVerifiedReq, }
