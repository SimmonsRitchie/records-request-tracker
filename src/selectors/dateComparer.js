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
    
    Our nextDue sorter sorts by smalled unix timestamp to biggest (ie. oldest date to furthest in future).
    To ensure that requests that are no longer relevant to us are at the bottom of the heap (ie, granted, denied and past the appeal deadline, appeal denied),
    they're given a unix timestamp very far in the future (the year 3000). A hacky approach. I subtract the request's filing date
    date in order that this lower heap is partially sorted from most recent to oldest.
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