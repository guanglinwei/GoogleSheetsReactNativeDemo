# Google Sheets App
View and edit a google sheet from React Native. 

## Running the App
- Clone this repo, then navigate to the proper directory
- If you already have a .env file and a google sheets, you can skip these steps:
  - You may need to follow [this guide](https://reactnative.dev/docs/environment-setup) to set up the dev environment
  - Follow [this guide](https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication?id=service-account) to set up a Google service account
  - Create a google sheets, share it with the Google service email, and make sure it is an editor
  - Set environment variables `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, and `SPREADSHEET_ID` to the service account's email, private key, and google sheet id respectively
  - Optionally, add a `PORT` environment variable to change the port of the node server
- **Ensure the .env file is named correctly. It cannot be `env`, but must be `.env`**
- `npm install`
- `npm run start`
- In a separate window, do `npm run android` or `npm run ios`
