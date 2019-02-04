import React from 'react';
import { connect } from 'react-redux'
import { DateRangePicker, isInclusivelyBeforeDay } from 'react-dates'
import { setTextFilter, sortByFilingDate, sortByAlphabet, sortByNextDue, setStartDate, setEndDate } from '../actions/filters'
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
        } else if (e.target.value === "nextDue") {
            this.props.sortByNextDue();
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
                <div className="input-group">
                    <div className="input-group__item">
                        {/* Text input - for setTextFilter action*/}
                        <input
                            type="text"
                            className="text-input"
                            placeholder="search requests"
                            value={this.props.filters.text}
                            onChange={this.onTextChange}
                        />
                    </div>
                    <div className="input-group__item">
                        {/* Select - for sortBy actions */}
                        <select
                            className="select"
                            value={this.props.filters.sortBy}
                            onChange={this.onSortChange}
                        >
                            <option value="nextDue">Response/action due</option>
                            <option value="filingDate">Filing date</option>
                            <option value="alphabet">A-Z</option>
                        </select>
                    </div>
                    <div className="input-group__item">
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
                </div>
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
    sortByNextDue: () => dispatch(sortByNextDue()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
});


export default connect(mapStateToProps, mapDispatchToProps)(RequestsListFilters);