import { Resend } from "resend"; // Import the Resend class from the resend package

const resend = new Resend(process.env.RESEND_API_KEY); // Create an instance of Resend using the API key from environment variables
const domain= process.env.NEXT_PUBLIC_APP_URL
export const sendVerificationEmail = async (email: string, token: string) => { // Define an asynchronous function to send a verification email
    const confirmLink = `${domain}/auth/new-verification?token=${token}`; // Construct the confirmation link, adding '=' before the token

    await resend.emails.send({ // Send an email using the Resend API
        from: "onboarding@resend.dev", // Specify the sender's email address
        to: email, // Specify the recipient's email address
        subject: "Confirm Your Email", // Specify the email subject
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>` // Specify the HTML content of the email
    }); // Send the email
}; 

export const sendPasswordResetEmail= async(email:string,token:string)=>{
    const resetLink =`${domain}/auth/new-password?token=${token}`
    await resend.emails.send({
        from:"onboarding@resend.dev",
        to:email,
        subject:"Reset your Password",
        html:`<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    })
}
export const sendTwoFactorTokenEmail= async (email:string,token:string)=>{
await resend.emails.send({
    from:"onboarding@resend.dev",
    to:email,
    subject:"2FA Code",
    html:`<p>Your 2Fa code :${token}</p>`
}) 
}