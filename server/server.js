// Here we're creating our own server

/*
HEROKU DEPLOYMENT STEPS

Use the following commands in terminal.
Note that [BRACKETS] are for stuff you need to type:

1) heroku login

    Logs into Heroku

2) heroku create [INSERT NAME OF APP]

    Heroku has now been created as a remote repo in your project. 

3) heroku config:set

    Update your ENV variables so Firebase works correctly.
    
    Do this by writing the above command and then copying and pasingeach line
    in your .env.development file. Seperate each line by a space.

    If you make a mistake, just use: heroku config:unset [KEY OF DATA]. To
    check your values, just type 'heroku config'.

4) Git push heroku master

    This push your app to heroku
*/

// IMPORTS
const path = require('path')
const express = require('express'); // Require is how we import in node.js

// GET PORT FOR HEROKU
// This uses Heroku's dynamic port if deploying to Heroku,
// If it doesn't exist then default to 3000 static port.
const port = process.env.PORT || 3000;

// CREATE INSTANCE
const app = express(); // creating a new instance of express

// SET PATH
const publicPath = path.join(__dirname, '..', 'public')
app.use(express.static(publicPath)); // telling express where the public folder is

// FALLBACK ROUTING
// This ensures that when users refresh (eg. on /create page) that
// the page refreshes properly. It sends the user index.html,
// which ensures routing works properly.
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
})

// LISTENING
// Below, we're giving two arguments
// 1) Giving express a port number. 3000 is a good one for local testing
// for dev purposes and is available on all OS. However this won't work
// on Heroku. Heroku will provide a dynamic value that changes each time
// it's deployed.
// You can view in browser at 'localhost:3000'
// 2) a callback function that spits out a message.
app.listen(port, () => {
    console.log("Server is up!")
});