import React from 'react';
import { connect } from 'react-redux'
import { DateRangePicker, isInclusivelyBeforeDay } from 'react-dates'
import { setTextFilter, sortByFilingDate, sortByAlphabet, setStartDate, setEndDate } from '../actions/filters'
import moment from 'moment'

export class RequestsListFilters extends React.Component {
    state = {
        calendarFocused: null
    }
    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value)
    }
    onSortChange = (e) => {
        if (e.target.value === 'filingDate') {
            this.props.sortByFilingDate();
        } else if (e.target.value === "alphabet") {
            this.props.sortByAlphabet();
        }
    }
    onDatesChange = ({ startDate, endDate} ) => {
        this.props.setStartDate(startDate)
        this.props.setEndDate(endDate)
    }
    onFocusChange = ( calendarFocused ) => {
        this.setState(() => ({ calendarFocused }));
    }
    render () {
        return (
            <div className="content-container">
                {/* Text input - for setTextFilter action*/}
                <input
                    type="text"
                    placeholder="search requests"
                    value={this.props.filters.text}
                    onChange={this.onTextChange}
                />
                {/* Select - for sortBy actions */}
                <select
                    className="select"
                    value={this.props.filters.sortBy}
                    onChange={this.onSortChange}
                >
                    <option value="filingDate">Filing date</option>
                    <option value="alphabet">A-Z</option>
                </select>
                {/* Date picker - for startDate and endDate actions */}
                <DateRangePicker
                    startDate={this.props.filters.startDate}
                    startDateId={"startDate"}
                    endDate={this.props.filters.endDate}
                    endDateId={"endDate"}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())} // days after today's date aren't selectable
                    showClearDates={true} // allows user to hit 'x' button to choose no dates
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByFilingDate: () => dispatch(sortByFilingDate()),
    sortByAlphabet: () => dispatch(sortByAlphabet()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
});


export default connect(mapStateToProps, mapDispatchToProps)(RequestsListFilters);