import React from 'react';
// import moment from 'moment'
import { SingleDatePicker, isInclusivelyBeforeDay } from 'react-dates'
import moment from 'moment-business-days';


class RequestForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.request ? props.request.description : "",
            agency: props.request ? props.request.agency : "",
            details: props.request ? props.request.details : "",
            filingDate: props.request ? moment(props.request.filingDate) : moment(),
            calendarFocused: false,
            error: ""
        };
    };
    onDescriptionChange = (e) => {
        const description = e.target.value
        this.setState(() => ({ description }))
     };
    onAgencyChange = (e) => {
        const agency = e.target.value
        this.setState(() => ({ agency }))
     };
    onDetailsChange = (e) => {
        const details = e.target.value
        this.setState(() => ({ details }))
     };
    onDateChange = (filingDate) => {
        if (filingDate) { //using an If statement here to prevent user from clearing value
            this.setState(() => ({ filingDate }));
        }
    };
    // activates datepicker when clicked
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }))
    }
    // Here's where the magic happens
    onSubmit = (e) => {
        e.preventDefault(); //Stops page from refreshing
        if (this.state.description === "") {
            this.setState(() => ({ error: "Please provide a description"}))
        } else {
            this.props.onSubmit({
                description: this.state.description,
                agency: this.state.agency,
                details: this.state.details,
                filingDate: this.state.filingDate.valueOf() // converts moment.js object into unix timestamp, otherwise we get errors with Firebase
            })
        }
    }

    render() {
        return (
            <div className="form"
                onSubmit={this.onSubmit}
            >
            {this.state.error && <p>{this.state.error}</p>}
            <form>
                <input 
                    className="text-input"
                    type="text"
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                    placeholder="Describe your request"
                    autoFocus
                />
                <input 
                    className="text-input"
                    type="text"
                    placeholder="Agency"
                    value={this.state.agency}
                    onChange={this.onAgencyChange}
                />
                <SingleDatePicker
                    date={this.state.filingDate} // Passing in value of now()
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1} // number of months that are displayed
                    isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())} // days after today's date aren't selectable
                />
                <textarea 
                    className="textarea"
                    type="text"
                    name="details"
                    placeholder="Full details of request"
                    value={this.state.details}
                    onChange={this.onDetailsChange}
                />
                <div>
                    <h3>Record response schedule:</h3>
                    <p>Interim response: {moment(this.state.filingDate).businessAdd(5).format('MMM-DD-YYYY')}</p>
                    <p>Final response: {moment(this.state.filingDate).businessAdd(35).format('MMM-DD-YYYY')}</p>
                </div>
                <div>
                    <button
                        className="button"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
        )
    }
}

export default RequestForm;