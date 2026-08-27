1. Add the ai model used as part of the resume database document
           
2. The response_format key used as part of the parameter for the open router fetch request gives error on the model: model: 'inclusionai/ling-3.0-flash:free' i need to check this with other models

3. for the email service providers email js is faster than nodemailer with an average time of 1.7s while nodemailer has an average time of 2.4s

4. in the auth flow, when the user request to change password, after sending an otp to them and verifying the otp, i could then probably do something like password-reset-pending:true on the user database model so when the user is redirected to put new password on the back end i could check if said user has a password request pending true property, this can serve as an extra layer of security

5. the current open router request with the updated prompt, and json schema in the prompt works the best compared to only putting the "response_format" field but for the description field in the experience section the "type" field is not added just the "text"

## notes on liquid/lfm-2.5-2.6b:free model          
on the open router website it says "liquid/lfm-2.5-2.6b:free" consorms to jsor_response but it didn't work the first time when i put all the parameters also  it stoped while working due to token length limit but when i added the response schema i expect as part of the prompt in addition to the response_format property, it followed the schema 100% and it didnt stop as a result of token length, the AI completed its task and returned the complete result to me, for both scenarios the AI responds in just over a minute.
- the education start and end date does not work correctly "startDate": "2009-09-01","endDate":"2013-06-30", 

## notes on nvidia/nemotron-3-super-120b-a12b:free
nemotron works well both with the expected jso nschema as part of the prompt with the response_format property and with the response_format property only ( expected json schema not in the prompt), it follows the schema to the letter and responds in about 1 mins 30s



## General notes
for both AI models, date related format comes like this  {"startDate": "2025-01", "endDate": "2026-12"}, for  a start date of 2025 and end date of 2026, the prompt for this could be fine tuned