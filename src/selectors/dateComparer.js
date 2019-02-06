/*This function is designed to sort request items by action/response due date. We get that date by first
looking at a request's status. Eg. if a request has only been filed, we look at its estInterimResponseDate.
If a request's status is 'waitingFinalResponse', we look at the requests 'estFinalResponseDate'

We compare these times as unix timestamps. We sort them from smallest to largest (ie. oldest date to furthest in future).

To ensure that requests that are no longer relevant to us are at the bottom of the heap (ie, granted, denied and past the appeal
deadline, appeal denied), they're given a unix timestamp very far in the future (the year 3000). A hacky approach.
I subtract the request's filing date in order that this lower heap is partially sorted from most recent to oldest.
*/

import moment from 'moment';

const dateComparer = ({
    description,
    status,
    filingDate,
    estInterimResponseDate,
    gotFinalResponseDate,
    estFinalResponseDate,
    estAppealDeadline,
    estFinalDetermDate
}) => {
    

    /* Tailoring output based on request's status
    
    
    */
    switch (status) {
        case 'waitingInterimResponse':
            return estInterimResponseDate;
        case 'waitingFinalResponse':
        case 'extendedFinalResponseDate':
            return estFinalResponseDate;
        case 'recordsDenied':
        case 'recordsPartiallyGranted':
            const validAppealDate = moment(estAppealDeadline) > moment() ? estAppealDeadline : 32503734809000 - filingDate
            return validAppealDate
        case 'appealFiled':
        case 'extendedFinalDetermDate':
            return estFinalDetermDate;
        case 'waitingCourtDecision':
            return 0;
        case 'recordsGranted':
        case 'appealDenied':
        case 'appealGranted':
        case 'appealPartiallyGranted':
        case 'courtGranted':
            return 32503734809000 - filingDate
    default:
            return 32503734809000;
    }

}


export default dateComparer;