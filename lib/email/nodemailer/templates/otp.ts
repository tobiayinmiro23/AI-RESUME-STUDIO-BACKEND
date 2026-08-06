
export const otpTemplate = (name: string,otp: string) => `
<div style="font-family: Arial, sans-serif;">
    <h2>Hello ${name},</h2>
    <p>Your verification code is:</p>
    <h1>${otp}</h1>
    <p>This code expires in 2 minutes.</p>
    <p>Do not share this OTP with anyone. If you didn't make this request, you can safely ignore this email.
    AI Resume Studio will never contact you about this email or ask for any login codes or links. Beware of phishing scams.
    Thanks for visiting AI Resume Studio!</p>
</div>
`;