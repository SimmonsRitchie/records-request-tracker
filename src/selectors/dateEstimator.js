import moment from 'moment';
import React from 'react';

const dateEstimator = (status, estimatedDates) => {
    const hStyle = {fontWeight: 'bold'}
    
    // Formatting dates in bold
    Object.keys(estimatedDates).map((key) => {
        const formattedTime = estimatedDates[key].format('MMM D, YYYY')
        estimatedDates[key] = <span style={hStyle}>{formattedTime}</span>
    });
    
    // Destructuring object
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
        case 'extendedFinalResponseDate':
            return <span>`Final response due on or before {estFinalResponseDate}</span>;
        case 'recordsDenied':
        case 'recordsPartiallyGranted':
            return <span>You can appeal on or before {estAppealDeadline}</span>
        case 'appealFiled':
            return <span>Appeal decision on or before {estFinalDetermDate}</span>;
    default:
            return "";
    }
}


export default dateEstimator;