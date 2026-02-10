# Process (assuming hosting is handled)

1. Download survey responses as a .csv
2. Run `node databaseWrite.js` (updating name to reflect survey responses)
3. Check links using hosted to see if working as intended
4. Run `node emailService.js` to send all emails. 

# File Descriptions

./templates contains the emails being used in .ejs format to handle the dynamic passing of information. 

./databaseWrite contains the information to write a csv into mongoDB while translating the columns into the necessary naming convention necessary for the frontend to work.

./emailService.js pulls the existing information from the mongoDB to send emails using an email service. 

.env file contains: `MONGO_URL=` which points to the Url to access the mongoDB database including the password. 
  `EMAIL_USER="vcplusplus.official@gmail.com"`: which points to the email address used to send emails 
  `EMAIL_PASS=`: which points to the key from google used to send emails (can't use password but need create a specific key).