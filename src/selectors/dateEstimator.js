import moment from 'moment'

const dateEstimator = (status, {
    estInterimResponseDate,
    estFinalResponseDate,
    estAppealDeadline,
    estFinalDetermDate
}) => {
    switch (status) {
        case 'waitingInterimResponse':
            const interimDue = moment(estInterimResponseDate).format('MMM Do, YYYY')
            return `Interim response due: ${interimDue}`;
        case 'waitingFinalResponse':
        case 'extendedFinalResponseDate':
            const finalDue = moment(estFinalResponseDate).format('MMM Do, YYYY')
            return `Final response due: ${finalDue}`;
        case 'recordsDenied':
        case 'recordsPartiallyGranted':
            const deadlineDue = moment(estAppealDeadline).format('MMM Do, YYYY')
            return `You have until ${deadlineDue} to appeal`;
        case 'appealFiled':
            const finalDetermDue = "woof woof"
            return `OOR determination expected: ${finalDetermDue}`;
    default:
            return "unknown";
    }
}


export default dateEstimator;