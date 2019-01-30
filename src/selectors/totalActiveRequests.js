// GETS TOTAL NUMBER OF 'ACTIVE' REQUESTS

const getTotalActiveRequests = (requests) => {
    return requests.reduce((accumulator, currentVal) => {
        if (currentVal.status !== "recordsGranted" && currentVal.status !== "recordsDenied" && currentVal.status !== "appealGranted" && currentVal.status !== "appealDenied" ) {
            return accumulator + 1
        } else {
            return accumulator
        }}, 0);
}

export default getTotalActiveRequests;