import moment from 'moment';
import React from 'react';

const dateEstimator = (status, estimatedDates) => {
    // const hStyle = {fontWeight: 'bold'}
    
    // Formatting dates in readable format, applying styles
    Object.keys(estimatedDates).map((key) => {
        const formattedTime = estimatedDates[key].format('MMM D, YYYY')
        estimatedDates[key] = <span className="date-estimator__date">{formattedTime}</span>
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


export default dateEstimator;