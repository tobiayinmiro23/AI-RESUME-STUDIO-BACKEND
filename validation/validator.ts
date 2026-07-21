import { verifyOtpSchema, resendOtpSchema, signInSchema } from "./schema";


export const signinValidator=(data : unknown)=>{
    const result = signInSchema.safeParse(data);
    let errMessage= result.error?.issues[0]?.message
    if (!result.success) return { isValid: false, errMessage };
    return { isValid: true, errMessage: undefined };
}

export const otpValidator=(data : unknown)=>{
    const result = verifyOtpSchema.safeParse(data);
    let errMessage= result.error?.issues[0]?.message
    if (!result.success) return { isValid: false, errMessage };
    return { isValid: true, errMessage: undefined };
}

export const resendOtpValidator=(data : unknown)=>{
    const result = resendOtpSchema.safeParse(data);
    let errMessage= result.error?.issues[0]?.message
    if (!result.success) return { isValid: false, errMessage };
    return { isValid: true, errMessage: undefined };
}