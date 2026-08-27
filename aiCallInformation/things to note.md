1. Add the ai model used as part of the resume database document
           
2. The response_format key used as part of the parameter for the open router fetch request gives error on the model: model: 'inclusionai/ling-3.0-flash:free' i need to check this with other models

3. for the email service providers email js is faster than nodemailer with an average time of 1.7s while nodemailer has an average time of 2.4s

4. in the auth flow, when the user request to change password, after sending an otp to them and verifying the otp, i could then probably do something like password-reset-pending:true on the user database model so when the user is redirected to put new password on the back end i could check if said user has a password request pending true property, this can serve as an extra layer of security

5. the current open router request with the updated prompt, and json schema in the prompt works the best compared to only putting the "response_format" field but for the description field in the experience section the "type" field is not added just the "text"
