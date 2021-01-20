# Stories.io

## How to  

1. to start server `cd server`  
    * `npm run devStart` to start in **development** mode  
    * `npm start` to start in **production** mode
2. to start the React app `cd server/web` 
    * `npm start` to serve the react app on a different port
    * `npm run build` to run a production build from the server itself

### Note

the server needs to be running for App to work  
You need a mail account to send Mail change the mail server settings in _/server/utils/Mail.js_  
> add a .env file in development mode and add mail auth (email, password)
