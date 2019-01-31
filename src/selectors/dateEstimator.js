import moment from 'moment'

const dateEstimator = (status, {
    estInterimResponseDate,
    estFinalResponseDate,
    estAppealDeadline,
    estFinalDetermDate
}) => {
    switch (status) {
        case 'waitingInterimResponse':
            const interimDue = moment(estInterimResponseDate).format('MMM D, YYYY')
            return `Interim response due on or before ${interimDue}`;
        case 'waitingFinalResponse':
        case 'extendedFinalResponseDate':
            const finalDue = moment(estFinalResponseDate).format('MMM D, YYYY')
            return `Final response due on or before ${finalDue}`;
        case 'recordsDenied':
        case 'recordsPartiallyGranted':
            const deadlineDue = moment(estAppealDeadline).format('MMM D, YYYY')
            return `You can appeal on or before ${deadlineDue}`;
        case 'appealFiled':
            const finalDetermDue = moment(estFinalDetermDate).format('MMM D, YYYY')
            return `Appeal decision on or before ${finalDetermDue}`;
    default:
            return "";
    }
}


export default dateEstimator;