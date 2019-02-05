/* This is a function that returns a small piece of text, wrapped in JSX, regarding when
filing responses/actions are due. Text is determined based on estimated dates (eg. estInterimResponseDate) and status.

This function has been broken out into a seperate file so that it's reuseable.
*/

import moment from 'moment';
import React from 'react';



const dateEstimateText = (status, estimatedDates) => {
    
    // Looping through estimatedDates object, formatting each date so they're more readable and applying styles
    Object.keys(estimatedDates).map((key) => {
        const formattedTime = estimatedDates[key].format('MMM D, YYYY')
        estimatedDates[key] = <span className="date-estimator__date">{formattedTime}</span>
    });
    
    // Destructuring estimatedDates object so we can get estimated dates for each status
    const {
        estInterimResponseDate,
        estFinalResponseDate,
        estAppealDeadline,
        estFinalDetermDate
    } = estimatedDates;

    // Tailoring output based on request's status
    switch (status) {
        case 'waitingInterimResponse':
            return <span>Interim response due on or before {estInterimResponseDate}</span>;
        case 'waitingFinalResponse':
            return <span>Final response due on or before {estFinalResponseDate}</span>;
        case 'extendedFinalResponseDate':
            return <span>Agency says it will provide records on {estFinalResponseDate}</span>;
        case 'recordsDenied':
        case 'recordsPartiallyGranted':
            return <span>You can appeal on or before {estAppealDeadline}</span>
        case 'appealFiled':
            return <span>Appeal decision on or before {estFinalDetermDate}</span>;
        case 'extendedFinalDetermDate':
            return <span>OOR says it will issue final determination on {estFinalDetermDate}</span>;
    default:
            return "";
    }
}


export default dateEstimateText;