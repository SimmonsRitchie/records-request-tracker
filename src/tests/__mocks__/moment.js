// We mock libraries so that they can be tested reliably.
// For instance, if we try to take snapshots of ExpenseForm without mocking
// the moment library, the snapshot will change each time because the
// timestamp for moment.now() will keep changing.
// To get around that, we use the code below to mock moment.js and 
// ensure that the timestamp is always the same.

const moment = require.requireActual('moment')

export default (timestamp = 0) => {
    return moment(timestamp);
};