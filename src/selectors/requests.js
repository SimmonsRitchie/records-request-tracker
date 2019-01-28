import moment from 'moment';

// GET VISIBLE requestS (FILTERING IN EFFECT!)
// This is just a function that displays only requests based on filters variables
// Using 'typeof !== number' to say: 'hey, if this is undefined, that's okay, just evaluate it as
// true and continue with the match.' If a start date is an actual number, then we want it to
// act as a filter.
// Filter method creates a new aray based on all items that are evaluated
// as true

export default (requests, { text, sortBy, startDate, endDate}) => {
    return requests.filter((request) => {
        const filingDateMoment = moment(request.filingDate); // converting filingDate to moment.js object
        // START DATE MATCH: true if request.startDate (stored value) is before user's selected startDate.
        // If there is no 'startDate' then evaluate to true because we don't want to filter it. 
        const startDateMatch = startDate ? startDate.isSameOrBefore(filingDateMoment, 'day')  : true ;
        // END DATE: true if request.startDate (stored value) is after to user's selected endDate 
        // If there is no 'endDate' then evaluate to true because we don't want to filter it. 
        const endDateMatch = endDate ? endDate.isSameOrAfter(filingDateMoment) : true;
        // TEXT MATCH: If search term is in description, agency, or details then true
        const searchInput = text.toLowerCase()
        const textToSearch = (request.description + request.agency + request.details).toLowerCase()
        const textMatch = textToSearch.includes(searchInput);
        // ALL TRUE: If the three variables above are true then include that
        // item in the visible requests array.
        return startDateMatch && endDateMatch && textMatch;

    }).sort((a,b) => {
        if (sortBy === 'filingDate') {
            return a.filingDate < b.filingDate ? 1 : -1
        } else if (sortBy === 'alphabet') {
            return a.description.toLowerCase() < b.description.toLowerCase() ? -1: 1
        }
    });
}
