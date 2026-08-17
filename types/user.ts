
export interface signInType { message: {
                email: string,
                id: string,
                accessToken: string,
                refreshToken: string,
            }, success: boolean };

export interface signUpType { message: string, success: boolean };