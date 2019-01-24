import * as firebase from 'firebase';

// CONFIG FIREBASE
// Here's we're connecting to our firebase database
const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
    };

// INITIALIZE
// Initializing firebase and authentication with Google as provider
firebase.initializeApp(config);
const database = firebase.database()
const googleAutProvider = new firebase.auth.GoogleAuthProvider();


// EXPORT
// For use in other parts of the program.
export { firebase, googleAutProvider, database as default };


//----------------- FIREBASE API REFERENCE -------------------
// REF
// '.ref()' - to get a particular part of the database. Precedes
// the methods below.
/////////////////////////////////////////////////////
// SET
// '.set()' - overwrites the database with given data if we don't provide ref
/////////////////////////////////////////////////////
// UPDATE
// '.update()' - updates data, can overwrite, remove and create.
// Remember to use 'location/city' syntax when updating individual
// item within object. As opposed to the 
// set() method, update() can be use to selectively update only
// the referenced properties at the current location (instead of 
// replacing all the child properties at the current location).
// Example:
// database.ref('expenses/expense1').update({ item: 'food', amount: 200 });
/////////////////////////////////////////////////////
// REMOVE
// '.remove()' - removes data based on ref. 
// database.ref('expenses/expense1').remove()
/////////////////////////////////////////////////////
// ONCE
// '.once('value')' - used to fetch data. Use
// '.then((snapshot) =>{snapshot.val}' to get value after
// promise is resolved. Example:
//
// database.ref().once('value').then((snapshot) => {
//     console.log(snapshot.val).catch((e) => {
//     console.log("error fetching data", e)
// });
// })
/////////////////////////////////////////////////////
// SUBSCRIBE - ON
// '.on' – watches for any changes to database.
// Requires a callback as second argument.
// Example:
//
// database.ref().on('value', (snapshot) => {
//     console.log(snapshot.val());
// });
// You can add an additional argument to display an error:
//
// const onValueChange = database.ref().on('value', (snapshot) => {
//     console.log(snapshot.val());
// }, (e) => {
//     console.log('Error with data fetching', e)
// });
// We can also change what triggers our subscription to do something.
// For instance, instead of passing in 'value' as the first argument
// we can instead use 'child_removed' to trigger whenever a child object
// is deleted. There's also 'child_added' and 'child_changed'. Eg
// database.ref('expenses').on('child_changed',(snapshot) => {
//     console.log('child changed:',snapshot.key, snapshot.val())
// })
/////////////////////////////////////////////////////
// SUBSCRIBE - OFF
// '.off' – stops watching the database. You can pass
// in the callback used in on to stop a specific subscription.
// Or you can stop it by assigning the on method a variable
// and then calling it in the off statement.
/////////////////////////////////////////////////////
// PUSH
// We use '.push' to handle arrays. We can push a
// single item to an array-like object in firebase like this:
// 
// database.ref('expenses').push(expenses[0])
//
// But firebase doesn't handle arrays so we really need to use
// forEach. The example below assumes we have an array called
// 'expenses':
//
// database.ref('expenses')
//     .once('value')
//     .then((snapshot) => {
//         const expensesList = []
//         snapshot.forEach((childSnapshot) => {
//             expensesList.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             });
//         });
//     console.log(expensesList)
//     });
// 
// If we wanted to subscribe and use this, we'd do the following.
// This would mean that the list would print everytime there's
// a change to the data:
//
// database.ref('expenses')
//     .once('value')
//     .then((snapshot) => {
//         const expensesList = []
//         snapshot.forEach((childSnapshot) => {
//             expensesList.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             });
//         });
//     console.log(expensesList)
//     });
