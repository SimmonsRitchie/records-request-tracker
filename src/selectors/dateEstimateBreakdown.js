/* This is a function that returns a short explanation of how estimated dates are calculated.
*/

import React from 'react';

const dateEstimateBreakdown = (status) => {
        

    // Tailoring output based on request's status
    let jsx = ""
    switch (status) {
        case 'waitingInterimResponse':
            jsx = <span>Interim responses are due 5 business days from a request's filing date.</span>
            break;
        case 'waitingFinalResponse':
            jsx = <span>Final responses are due 30 calendar days from the date an interim response is issued.</span>
            break;
        case 'extendedFinalResponseDate':
            jsx = <span>This date is based on the final response date you entered above.</span>;
            break;
        case 'recordsDenied':
        case 'recordsPartiallyGranted':
            jsx = <span>You can file an appeal within 15 business days of receiving an agency's final response.</span>
            break;
        case 'appealFiled':
            jsx = <span>The Office of Open Records is required to provide a final determination (ie. appeal decision) 30 calendar days after receiving an appeal.</span>;
            break;
        case 'extendedFinalDetermDate':
            jsx = <span>This date is based on the final determination date you entered above.</span>;
            break;
    default:
            jsx = "";
    }

    return jsx;
}


export default dateEstimateBreakdown;