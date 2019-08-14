
//SET_TEXT_FILTER
export const setTextFilter = ( text = "" ) => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_FILING_DATE
export const sortByFilingDate = () => ({
    type: 'SORT_BY_FILING_DATE'
});

// SORT_BY_ALPHABETIC
export const sortByAlphabet = () => ({
    type: 'SORT_BY_ALPHABET'
});

// SORT_BY_NEXT_DUE
export const sortByNextDue = () => ({
    type: 'SORT_BY_NEXT_DUE'
});

// SET_START_DATE
export const setStartDate = ( startDate ) => ({
    type: 'SET_START_DATE',
    startDate
});

// SET_END_DATE
export const setEndDate = ( endDate ) => ({
    type: 'SET_END_DATE',
    endDate
});