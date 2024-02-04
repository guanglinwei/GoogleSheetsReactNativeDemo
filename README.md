# Google Sheets App
View and edit a google sheet from React Native. 

## Running the App
- Clone this repo, then navigate to the proper directory
- You may need to follow [this guide](https://reactnative.dev/docs/environment-setup) to set up the dev environment
- Follow [this guide](https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication?id=service-account) to set up a Google service account
- Create a google sheets, share it with the Google service email, and make sure it is an editor
- Set environment variables `GOOGLE_SERVICE_ACCOUNT_EMAIL` and `GOOGLE_PRIVATE_KEY` to the service account's email and private key respectively
- `npm install`
- `npm run start`
- In a separate window, do `npm run android` or `npm run ios`
