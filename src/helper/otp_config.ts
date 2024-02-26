import * as dotenv from 'dotenv';
dotenv.config();

// EMAIL JS
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID ?? ""
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID ?? ""
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY ?? ""

// TWILIO
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID ?? ""
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN ?? ""

export {
    EMAILJS_PUBLIC_KEY,
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
}