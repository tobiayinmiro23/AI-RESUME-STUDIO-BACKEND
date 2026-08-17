
export interface signInType { 
            message: {
                email: string,
                id: string,
                accessToken: string,
            }, success: boolean
            refreshToken:string
         };

export interface responseType { message: string, success: boolean };