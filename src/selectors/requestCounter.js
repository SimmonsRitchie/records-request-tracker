// These functions get the total number of a user's active, granted, and denied requests.

export const getTotalActiveRequests = (requests) => {
    return requests.reduce((accumulator, currentVal) => {
        const activeRequestTerms = [
            "waitingInterimResponse",
            "waitingFinalResponse",
            "extendedFinalResponseDate",
            "appealFiled",
            "extendedFinalDetermDate",
            "waitingCourtDecision"
        ]
        return activeRequestTerms.includes(currentVal.status) ? accumulator + 1 : accumulator
    }, 0);
}

export const getTotalGrantedRequests = (requests) => {
    return requests.reduce((accumulator, currentVal) => {
        if (currentVal.status === "recordsGranted" || currentVal.status === "recordsPartiallyGranted" || currentVal.status === "appealGranted" || currentVal.status === "courtGranted") {
            return accumulator + 1
        } else {
            return accumulator
        }}, 0);
}

export const getTotalDeniedRequests = (requests) => {
    return requests.reduce((accumulator, currentVal) => {
        if (currentVal.status === "recordsDenied" || currentVal.status === "appealDenied" || currentVal.status === "courtDenied") {
            return accumulator + 1
        } else {
            return accumulator
        }}, 0);
}

