import React from 'react';
import moment from 'moment';


const requestStatusSummary = ({
    status,
    estInterimResponseDate,
    estFinalResponseDate,
    estAppealDeadline,
    estFinalDetermDate,
}) => {
    /* We use moment's 'startOf' method in this function so that we don't get wacky results
    when counting down to specific dates */
    const todayDate = moment().startOf('day')
    let hStyle = {color: '#e2931b'}

    if (status === 'waitingInterimResponse') {
        const startOfEstInterimResponseDate = moment(estInterimResponseDate).startOf('day')
        const DaysBetweenDates = startOfEstInterimResponseDate.diff(todayDate, 'days') // Note that Moment's 'diff' method truncates results rather than rounds them
        const daysDue = DaysBetweenDates === 0 ? "today" : todayDate.to(startOfEstInterimResponseDate)
        return <span style={ hStyle }>Interim response due {daysDue}.</span>
    }
    else if (status === "waitingFinalResponse" || status === "extendedFinalResponseDate") {
        const startOfEstFinalResponseDate = moment(estFinalResponseDate).startOf('day')
        const DaysBetweenDates = startOfEstFinalResponseDate.diff(todayDate, 'days')
        const daysDue = DaysBetweenDates === 0 ? "today" : todayDate.to(startOfEstFinalResponseDate)
        return <span style={ hStyle }>Final response due {daysDue}.</span>
    } else if (status === "recordsGranted" ) {
        let hStyle = {color: 'green' }
        return <span style={ hStyle }>Request granted.</span>
    } else if (status === "recordsDenied") {
        let hStyle = {color: 'red' }
        const startOfEstAppealDeadline = moment(estAppealDeadline).startOf('day')
        const DaysBetweenDates = startOfEstAppealDeadline.diff(todayDate, 'days')
        const daysDue = todayDate.to(startOfEstAppealDeadline)
        if (DaysBetweenDates > 0) {
            return <span style={ hStyle }>Denied. Appeal deadline {daysDue}</span>
        } else if (DaysBetweenDates < 0) {
            return <span style={ hStyle }>Denied. Appeal deadline passed.</span>
        } else {
            return <span style={ hStyle }>Denied. Appeal deadline today.</span>
        }
    } else if (status === "recordsPartiallyGranted") {
        let hStyle = {color: '#72aa17' }
        const startOfEstAppealDeadline = moment(estAppealDeadline).startOf('day')
        const DaysBetweenDates = startOfEstAppealDeadline.diff(todayDate, 'days')
        const daysDue = todayDate.to(startOfEstAppealDeadline)
        if (DaysBetweenDates > 0) {
            return <span style={ hStyle }>Partially granted. Appeal deadline {daysDue}.</span>
        } else if (DaysBetweenDates < 0) {
            return <span style={ hStyle }>Partially granted. Appeal deadline passed.</span>
        } else {
            return <span style={ hStyle }>Partially granted. Appeal deadline today.</span>
        }
    } else if (status === "appealFiled" || status === "extendedFinalDetermDate") {
        const startOfEstFinalDetermDate = moment(estFinalDetermDate).startOf('day')
        const DaysBetweenDates = startOfEstFinalDetermDate.diff(todayDate, 'days')
        const daysDue = DaysBetweenDates === 0 ? "today" : todayDate.to(startOfEstFinalDetermDate)
        return <span style={ hStyle }>Appeal decision due {daysDue}.</span>
    } else if (status === "appealDenied" ) {
        let hStyle = {color: 'red' }
        return <span style={ hStyle }>Appeal denied.</span>
    } else if (status === "appealGranted" ) {
        let hStyle = {color: 'green' }
        return <span style={ hStyle }>Appeal granted.</span>
    } else if (status === "waitingCourtDecision" ) {
        return <span style={ hStyle }>Request is in litigation</span>
    } else {
        return "Status unknown"
    }
}

export default requestStatusSummary