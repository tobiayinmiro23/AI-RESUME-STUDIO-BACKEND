
export const otpTemplate = (name: string,otp: string) => `
<div style="font-family: Arial, sans-serif;">
    <h2>Hello ${name},</h2>
    <p>Your verification code is:</p>
    <h1>${otp}</h1>
    <p>This code expires in 2 minutes.</p>
    <p>AI Resume Studio</p>
</div>
`;