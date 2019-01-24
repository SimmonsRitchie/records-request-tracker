// Here we're creating our own server

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