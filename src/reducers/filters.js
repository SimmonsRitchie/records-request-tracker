import moment from 'moment';

// DEFAULT STATE
const filtersReducerDefaultState = {
    text: "",
    sortBy: 'nextDue', // by default, sorting requests based on those where responses are closest to today's date
    startDate: moment().subtract(1, 'year'), // by default, only showing requests that are a year old
    endDate: moment().endOf('day')
}

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_FILING_DATE':
            return {
                ...state,
                sortBy: 'filingDate'
            }
        case 'SORT_BY_ALPHABET':
            return {
                ...state,
                sortBy: 'alphabet'
            }
        case 'SORT_BY_NEXT_DUE':
            return {
                ...state,
                sortBy: 'nextDue'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state;
    }
}
