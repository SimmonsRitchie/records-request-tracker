import React from 'react';
import moment from 'moment';


const listItemStatus = ({status, finalDetermDate, appealFilingDate}) => {
    const todayDate = moment()
    let hStyle = {color: '#e2931b'}
    if (status === "waitingFinalResponse" || status === "extendedFinalResponseDate") {
        const countdownToFinalResponse = moment(finalDetermDate).diff(todayDate, 'days')
        return <span style={ hStyle }>Final response due: {countdownToFinalResponse} days</span>
    } else if (status === "recordsGranted" ) {
        let hStyle = {color: 'green' }
        return <span style={ hStyle }>Request granted</span>
    } else if (status === "recordsDenied" ) {
        let hStyle = {color: 'red' }
        return <span style={ hStyle }>Request denied</span>
    } else if (status === "appealFiled" ) {
        const formattedAppealDate = moment(appealFilingDate).format('MMM Do, YYYY')
        return <span style={ hStyle }>Appeal filed on {formattedAppealDate}</span>
    } else if (status === "appealDenied" ) {
        let hStyle = {color: 'red' }
        return <span style={ hStyle }>Appeal denied</span>
    } else if (status === "appealGranted" ) {
        let hStyle = {color: 'green' }
        return <span style={ hStyle }>Appeal granted</span>
    } else if (status === "waitingCourtDecision" ) {
        return <span style={ hStyle }>Request is in litigation</span>
    } else {
        return "Status: unknown"
    }
}

export default listItemStatus