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
            note: props.request ? props.request.note : "",
            status: props.request ? props.request.status : "waitingFinalResponse",
            filingDate: props.request ? moment(props.request.filingDate) : moment(),
            finalResponseDate: props.request ? moment(props.request.finalResponseDate) : moment().businessAdd(35),
            actualFinalResponseDate: props.request ? moment(props.request.finalResponseDate) : moment().businessAdd(35),
            denialReason: props.request ? props.request.denialReason : "",
            appealFilingDate: props.request ? moment(props.request.appealFilingDate) : moment().businessAdd(35),     
            finalDetermDate: props.request ? moment(props.request.finalDetermDate) : moment().businessAdd(35),
            finalDetermDetails: props.request ? props.request.finalDetermDetails : "",
            filingDateCalendarFocused: false,
            finalResponseCalendarFocused: false,
            actualFinalResponseCalendarFocused: false,
            appealFilingCalendarFocused: false,
            finalDetermCalendarFocused: false,
            error: ""
        };
    };
    onDescriptionChange = (e) => {
        const description = e.target.value
        const maxLength = 60
        if (description.length > maxLength) {
            this.setState(() => ({ error: `Max of ${maxLength} characters for description`}))
        } else {
            this.setState(() => ({
                error: "", 
                description
            }))
        }
    };
    onAgencyChange = (e) => {
        const agency = e.target.value
        const maxLength = 60
        if (agency.length > 60) {
            this.setState(() => ({ error: `Max of ${maxLength} characters for agency`}))
        } else {
            this.setState(() => ({ agency }))
        }
    };
    onFilingDateChange = (filingDate) => {
        const finalDetermDate = filingDate.businessAdd(35)
        if (filingDate) { //using an If statement here to prevent user from clearing value
            this.setState(() => ({ 
                filingDate,
                finalDetermDate
            }));
        }
    };
    onFilingDateFocusChange = ({ focused }) => {
        this.setState(() => ({ filingDateCalendarFocused: focused }))
    }
    onStatusChange = (e) => {
        const newStatus = e.target.value
        this.setState(() => ({ status: newStatus}))
    }
    onDetailsChange = (e) => {
        const details = e.target.value
        this.setState(() => ({ details }))
    };
    onNoteChange = (e) => {
        const note = e.target.value
        this.setState(() => ({ note }))
    };
    onDenialReasonChange = (e) => {
        const denialReason = e.target.value
        this.setState(() => ({ denialReason }))
    };
    onFinalResponseDateChange = (finalResponseDate) => {
        if (finalResponseDate) { //using an If statement here to prevent user from clearing value
            this.setState(() => ({ finalResponseDate }));
        }
    };
    onFinalResponseFocusChange = ({ focused }) => {
        this.setState(() => ({ finalResponseCalendarFocused: focused }))
    }
    onActualFinalResponseDateChange = (actualFinalResponseDate) => {
        if (actualFinalResponseDate) { //using an If statement here to prevent user from clearing value
            this.setState(() => ({ actualFinalResponseDate }));
        }
    };
    onActualFinalResponseFocusChange = ({ focused }) => {
        this.setState(() => ({ actualFinalResponseCalendarFocused: focused }))
    }
    onAppealFilingDateChange = (appealFilingDate) => {
        if (appealFilingDate) { //using an If statement here to prevent user from clearing value
            this.setState(() => ({ appealFilingDate }));
        }
    };
    onAppealFilingFocusChange = ({ focused }) => {
        this.setState(() => ({ appealFilingCalendarFocused: focused }))
    }
    onFinalDetermDateChange = (finalDetermDate) => {
        if (finalDetermDate) { //using an If statement here to prevent user from clearing value
            this.setState(() => ({ finalDetermDate }));
        }
    };
    onFinalDetermFocusChange = ({ focused }) => {
        this.setState(() => ({ finalDetermCalendarFocused: focused }))
    }
    onFinalDetermDetailsChange = (e) => {
        const finalDetermDetails = e.target.value
        this.setState(() => ({ finalDetermDetails }))
    }
    // Where the magic happens
    onSubmit = (e) => {
        e.preventDefault(); //Stops page from refreshing
        if (this.state.description === "" && this.state.agency === "") {
            this.setState(() => ({ error: "Please provide a description and agency"}))
        } else {
            this.props.onSubmit({
                description: this.state.description,
                agency: this.state.agency,
                details: this.state.details,
                note: this.state.note,
                status: this.state.status,
                filingDate: this.state.filingDate.valueOf(), // converts moment.js object into unix timestamp, otherwise we get errors with Firebase
                finalResponseDate: this.state.finalResponseDate.valueOf(),
                denialReason: this.state.denialReason,
                appealFilingDate: this.state.appealFilingDate.valueOf(),
                finalDetermDate: this.state.finalDetermDate.valueOf()
            })
        }
    }

    render() {
        return (
            <form className="form"
            >
            {this.state.error &&
                <p className="form__error">
                    {this.state.error}
                </p>}
                {/* REQUEST STATUS - static input */}                
                <div className="form__group">
                    <p className="form__item-label">Request status:</p>
                    <select
                        className="select"
                        onChange={this.onStatusChange}
                        value={this.state.status}
                    >
                        <option value="waitingFinalResponse">Request filed</option>
                        <option value="recordsDenied">Request denied</option>
                        <option value="recordsGranted">Request granted</option>
                        <option value="recordsPartiallyGranted">Request partially granted</option>
                        <option value="extendedFinalResponseDate">Agency requested final response date extension</option>
                        <option value="appealFiled">Appeal filed</option>
                        <option value="appealGranted">OOR granted access to records</option>
                        <option value="appealDenied">OOR denied access to records</option>
                        <option value="appealPartiallyGranted">OOR partially granted</option>
                        <option value="waitingCourtDecision">Awaiting court decision</option>
                    </select>
                </div>
                {/* DESCRIPTION OF REQUEST - static input */}
                <div className="form__group">
                    <p className="form__item-label">Description of request:</p>
                    <input 
                        className="text-input"
                        type="text"
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                        autoFocus
                    />
                </div>
                {/* AGENCY - static input */}                
                <div className="form__group">
                    <p className="form__item-label">Agency:</p>
                    <input
                        className="text-input"
                        type="text"
                        value={this.state.agency}
                        onChange={this.onAgencyChange}
                    />
                </div>
                {/* FILING DATE - static input */}                
                <div className="form__group">
                    <p className="form__item-label">Date request filed:</p>
                    <SingleDatePicker
                        date={this.state.filingDate} // Passing in value of now()
                        onDateChange={this.onFilingDateChange}
                        focused={this.state.filingDateCalendarFocused}
                        onFocusChange={this.onFilingDateFocusChange}
                        numberOfMonths={1} // number of months that are displayed
                        isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())} // days after today's date aren't selectable
                        block={true}
                    />
                </div>
                {/* ESTIMATED FINAL RESPONSE DATE - conditional input */}
                {this.state.status === "extendedFinalResponseDate" &&
                    <div className="form__group">
                        <p className="form__item-label">Extended final response date (if given by agency):</p> 
                        <SingleDatePicker 
                            date={this.state.finalResponseDate} // Passing in value of now()
                            onDateChange={this.onFinalResponseDateChange}
                            focused={this.state.finalResponseCalendarFocused}
                            onFocusChange={this.onFinalResponseFocusChange}
                            numberOfMonths={1} // number of months that are displayed  
                            block={true}
                         />                   
                    </div>
                }                
                {/* RECIEVED FINAL RESPONSE DATE - conditional input */}
                {(this.state.status === "recordsGranted" || this.state.status === "recordsDenied"
                    || this.state.status === "recordsPartiallyGranted" || this.state.status === "appealFiled" 
                    || this.state.status === "appealGranted" || this.state.status === "appealDenied"
                    || this.state.status === "appealPartiallyGranted" || this.state.status === "waitingCourtDecision") &&
                    <div className="form__group">
                        <p className="form__item-label">Date agency issued final response:</p>
                        <SingleDatePicker 
                            date={this.state.actualFinalResponseDate} // Passing in value of now()
                            onDateChange={this.onActualFinalResponseDateChange}
                            focused={this.state.actualFinalResponseCalendarFocused}
                            onFocusChange={this.onActualFinalResponseFocusChange}
                            numberOfMonths={1} // number of months that are displayed
                            block={true} 
                            isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())} // days after today's date aren't selectable
                         />                                 
                    </div>
                }
                {/* APPEAL FILED DATE - conditional input */}
                {(this.state.status === "appealFiled" || this.state.status === "appealGranted"
                || this.state.status === "appealDenied" || this.state.status === "appealPartiallyGranted"
                || this.state.status === "waitingCourtDecision") &&
                    <div className="form__group">
                        <p className="form__item-label">Date appeal with OOR was filed:</p> 
                        <SingleDatePicker 
                            date={this.state.appealFilingDate} // Passing in value of now()
                            onDateChange={this.onAppealFilingDateChange}
                            focused={this.state.appealFilingCalendarFocused}
                            onFocusChange={this.onAppealFilingFocusChange}
                            numberOfMonths={1} // number of months that are displayed 
                            block={true} 
                            isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())} // days after today's date aren't selectable
                            />                   
                    </div>
                }
                {/* OOR FINAL DETERMINATION DATE - conditional input*/}
                {(this.state.status === "appealGranted" || this.state.status === "appealDenied" 
                || this.state.status === "appealPartiallyGranted" || this.state.status === "waitingCourtDecision") &&
                    <div className="form__group">
                        <p className="form__item-label">Date OOR issued final determination: </p>
                        <SingleDatePicker 
                            date={this.state.finalDetermDate} // Passing in value of now()
                            onDateChange={this.onFinalDetermDateChange}
                            focused={this.state.finalDetermCalendarFocused}
                            onFocusChange={this.onFinalDetermFocusChange}
                            numberOfMonths={1} // number of months that are displayed  
                            block={true}
                            isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())} // days after today's date aren't selectable
                            />
                    </div>
                }
                {/* DETAILS - static input*/}
                <div className="form__group">
                    <p className="form__item-label">Full details of request:</p>
                    <textarea 
                        className="textarea"
                        type="text"
                        name="details"
                        value={this.state.details}
                        onChange={this.onDetailsChange}
                    />
                </div>
                {/* NOTE - static input*/}
                <div className="form__group">
                    <p className="form__item-label">Notes:</p>
                    <textarea
                        className="textarea"
                        type="text"
                        name="note"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    />
                </div>
                {/* REASON FOR DENIAL or PARTIAL DENIAL - conditional input*/}
                {(this.state.status === "recordsDenied" || this.state.status === "recordsPartiallyGranted"
                    || this.state.status === "appealFiled" || this.state.status === "appealGranted"
                    || this.state.status === "appealDenied" || this.state.status === "appealPartiallyGranted"
                    || this.state.status === "waitingCourtDecision") &&
                    <div className="form__group">
                        <p className="form__item-label">Reason agency denied or partially denied request</p>
                        <textarea
                            className="textarea"
                            type="text"
                            name="denialReason"
                            value={this.state.denialReason}
                            onChange={this.onDenialReasonChange}
                        />
                    </div>
                }
                {/* NOTES ABOUT OOR FINAL DETERMINATION DATE - conditional input*/}
                {(this.state.status === "appealGranted" || this.state.status === "appealDenied" 
                || this.state.status === "appealPartiallyGranted" || this.state.status === "waitingCourtDecision") &&
                        <div className="form__group">
                            <p className="form__item-label">Notes about OOR's final determination</p>                   
                            <textarea
                                className="textarea"
                                type="text"
                                name="finalDetermDetails"
                                value={this.state.finalDetermDetails}
                                onChange={this.onFinalDetermDetailsChange} 
                            />
                        </div>
                }
                    <div className="button-container">
                        <button
                        className="button"
                        onClick={this.onSubmit}
                        >
                            Save request
                        </button>
                        <button
                        className="button button--secondary"
                        onClick={this.props.onRemove}
                        >
                            Remove request
                        </button>
                    </div>
            </form>
        )
    }
}

export default RequestForm;