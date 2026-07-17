import { signInSchema } from "./schema";


export const signinValidator=(data : unknown)=>{
    const result = signInSchema.safeParse(data);
    let errMessage= result.error?.issues[0]?.message
    if (!result.success) return { isValid: false, errMessage };
    return { isValid: true, errMessage: undefined };
}