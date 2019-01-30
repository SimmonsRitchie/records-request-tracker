import React from 'react';
import moment from 'moment';


const requestStatusSummary = ({status, estFinalResponseDate, appealFilingDate}) => {
    /* We use moment's 'startOf' method in this function so that we don't get wacky results
    when counting down to specific dates */
    const todayDate = moment().startOf('day')
    let hStyle = {color: '#e2931b'}
    if (status === "waitingFinalResponse" || status === "extendedFinalResponseDate") {
        const startOfEstFinalResponseDate = moment(estFinalResponseDate).startOf('day')
        const DaysBetweenDates = startOfEstFinalResponseDate.diff(todayDate, 'days') // Moment's 'diff' method truncates results rather than rounds them
        if (DaysBetweenDates === 0) {
            return <span style={ hStyle }>Final response due today</span>
        } else {
            return <span style={ hStyle }>Final response due {todayDate.to(startOfEstFinalResponseDate)}</span>
        }
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

export default requestStatusSummary