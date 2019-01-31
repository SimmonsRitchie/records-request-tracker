import React from 'react';
// import moment from 'moment'
import { SingleDatePicker, isInclusivelyBeforeDay } from 'react-dates'
import moment from 'moment-business-days';
import DateEstimator from './DateEstimator'

//TODO: Ensure that bussinessAdd takes into consideration government holidays.

class RequestForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: props.request ? props.request.status : "waitingInterimResponse",
            description: props.request ? props.request.description : "",
            agency: props.request ? props.request.agency : "",
            filingDate: props.request ? moment(props.request.filingDate) : moment(),
            estInterimResponseDate: props.request ? moment(props.request.gotInterimResponseDate) : moment().businessAdd(5),
            gotInterimResponseDate: props.request ? moment(props.request.gotInterimResponseDate) : moment(),
            estFinalResponseDate: props.request ? moment(props.request.estFinalResponseDate) : moment().businessAdd(5).add(30,'days'),
            gotFinalResponseDate: props.request ? moment(props.request.gotFinalResponseDate) : moment(),
            estAppealDeadline: props.request ? moment(props.request.estAppealDeadline) : moment().businessAdd(5).add(30,'days').businessAdd(15),    
            appealFilingDate: props.request ? moment(props.request.appealFilingDate) : moment(),    
            estFinalDetermDate: props.request ? moment(props.request.estFinalDetermDate) : moment().businessAdd(5).add(30,'days').businessAdd(15).add(30,'days'),    
            gotFinalDetermDate: props.request ? moment(props.request.finalDetermDate) : moment(),
            details: props.request ? props.request.details : "",
            note: props.request ? props.request.note : "",
            denialReason: props.request ? props.request.denialReason : "",
            finalDetermDetails: props.request ? props.request.finalDetermDetails : "",
            filingDateCalendarFocused: false,
            gotInterimResponseDateCalendarFocused: false,
            estFinalResponseCalendarFocused: false,
            gotFinalResponseCalendarFocused: false,
            appealFilingDateCalendarFocused: false,
            gotFinalDetermCalendarFocused: false,
            error: ""
        };
    };

    // STATUS
    onStatusChange = (e) => {
        const newStatus = e.target.value
        this.setState(() => ({ status: newStatus}))
    }

    // DESCRIPTION
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
    // AGENCY
    onAgencyChange = (e) => {
        const agency = e.target.value
        const maxLength = 60
        if (agency.length > 60) {
            this.setState(() => ({ error: `Max of ${maxLength} characters for agency`}))
        } else {
            this.setState(() => ({ agency }))
        }
    };
    // DATE - FILING
    onFilingDateChange = (filingDate) => {
        if (filingDate) { //using an If statement here to prevent user from clearing value
            const estInterimResponseDate = moment(filingDate).businessAdd(5) // interim response is due on or before 5 business days
            this.setState(() => ({ 
                filingDate,
                estInterimResponseDate
            }));
        }
    };
    onFilingDateFocusChange = ({ focused }) => {
        this.setState(() => ({ filingDateCalendarFocused: focused }))
    }
    // DATE - GOT INTERIM RESPONSE 
    onGotInterimResponseDateChange = (gotInterimResponseDate) => {
        if (gotInterimResponseDate) { //using an If statement here to prevent user from clearing value
            const estFinalResponseDate = moment(gotInterimResponseDate).add(30, 'days') // final response due on or before 30 calendar days
            this.setState(() => ({ 
                gotInterimResponseDate,
                estFinalResponseDate
            }));
        }
    };
    onGotInterimResponseDateFocusChange = ({ focused }) => {
        this.setState(() => ({ gotInterimResponseDateCalendarFocused: focused }))
    }
    // DATE - EST FINAL RESPONSE
    onEstFinalResponseDateChange = (estFinalResponseDate) => {
        if (estFinalResponseDate) { //using an If statement here to prevent user from clearing value
            this.setState(() => ({ estFinalResponseDate }));
        }
    };
    onEstFinalResponseFocusChange = ({ focused }) => {
        this.setState(() => ({ estFinalResponseCalendarFocused: focused }))
    }
    // DATE - GOT FINAL RESPONSE
    onGotFinalResponseDateChange = (gotFinalResponseDate) => {
        if (gotFinalResponseDate) { //using an If statement here to prevent user from clearing value
            const estAppealDeadline = moment(gotFinalResponseDate).businessAdd(15) // OOR appeal filing date is on or before 15 business days
            this.setState(() => ({
                gotFinalResponseDate,
                estAppealDeadline
            }));
        }
    };
    onGotFinalResponseFocusChange = ({ focused }) => {
        this.setState(() => ({ gotFinalResponseCalendarFocused: focused }))
    }
    // DATE - USER FILED APPEAL
    onAppealFilingDateChange = (appealFilingDate) => {
        if (appealFilingDate) { //using an If statement here to prevent user from clearing value
            const estFinalDetermDate = moment(appealFilingDate).add(30,'days') // OOR final determ is on or before 30 calendar days after appeal filed
            this.setState(() => ({ 
                appealFilingDate,
                estFinalDetermDate
             }));
        }
    };
    onAppealFilingDateFocusChange = ({ focused }) => {
        this.setState(() => ({ appealFilingDateCalendarFocused: focused }))
    }
    // DATE - GOT OOR FINAL DETERMINATION
    onGotFinalDetermDateChange = (gotFinalDetermDate) => {
        if (gotFinalDetermDate) { //using an If statement here to prevent user from clearing value
            this.setState(() => ({ gotFinalDetermDate }));
        }
    };
    onGotFinalDetermFocusChange = ({ focused }) => {
        this.setState(() => ({ gotFinalDetermCalendarFocused: focused }))
    }
    // DETAILS OF REQUEST
    onDetailsChange = (e) => {
        const details = e.target.value
        this.setState(() => ({ details }))
    };
    // NOTE
    onNoteChange = (e) => {
        const note = e.target.value
        this.setState(() => ({ note }))
    };
    // DENIAL
    onDenialReasonChange = (e) => {
        const denialReason = e.target.value
        this.setState(() => ({ denialReason }))
    };

    // DETAILS OF OOR APPEAL
    onFinalDetermDetailsChange = (e) => {
        const finalDetermDetails = e.target.value
        this.setState(() => ({ finalDetermDetails }))
    }
    // ON SUBMIT
    onSubmit = (e) => {
        e.preventDefault(); //Stops page from refreshing
        if (this.state.description === "" || this.state.agency === "") {
            this.setState(() => ({ error: "Please provide a description and agency"}))
        } else {
            this.props.onSubmit({
                status: this.state.status,
                description: this.state.description,
                agency: this.state.agency,
                filingDate: this.state.filingDate.valueOf(), // converts moment.js object into unix timestamp, otherwise we get errors with Firebase
                estInterimResponseDate: this.state.estInterimResponseDate.valueOf(),
                gotInterimResponseDate: this.state.gotInterimResponseDate.valueOf(),
                estFinalResponseDate: this.state.estFinalResponseDate.valueOf(),
                gotFinalResponseDate: this.state.gotFinalResponseDate.valueOf(),
                estAppealDeadline: this.state.estAppealDeadline.valueOf(),
                appealFilingDate: this.state.appealFilingDate.valueOf(),
                estFinalDetermDate: this.state.appealFilingDate.valueOf(),
                gotFinalDetermDate: this.state.gotFinalDetermDate.valueOf(),
                details: this.state.details,
                note: this.state.note,
                denialReason: this.state.denialReason,
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
                        <option value="waitingInterimResponse">Request filed</option>
                        <option value="waitingFinalResponse">Interim response received</option>
                        <option value="recordsDenied">Request denied</option>
                        <option value="recordsGranted">Request granted</option>
                        <option value="recordsPartiallyGranted">Request partially granted</option>
                        <option value="extendedFinalResponseDate">Agency requested final response date extension</option>
                        <option value="appealFiled">Appeal filed</option>
                        <option value="extendedFinalDetermDate">OOR requests extension for final determination</option> {/*TODO: Add another datepicker for revised date */}
                        <option value="appealGranted">OOR granted access to records</option>
                        <option value="appealDenied">OOR denied access to records</option>
                        <option value="appealPartiallyGranted">OOR partially granted access to records</option>
                        <option value="waitingCourtDecision">Agency/third parties appealed OOR decision</option>
                        <option value="courtDecision">Request settled by courts</option>
                    </select>
                </div>
                <div className="form__basic-info">
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
                </div>
                {/* DATE ENTRY CONTAINER */}
                <div className="form__date-container">
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
                    {/* INTERIM RESPONSE RECIEVED - conditional input */}
                    {(this.state.status === "waitingFinalResponse" || this.state.status === "recordsGranted" || this.state.status === "recordsDenied"
                    || this.state.status === "recordsPartiallyGranted" || this.state.status === "appealFiled" 
                    || this.state.status === "appealGranted" || this.state.status === "appealDenied"
                    || this.state.status === "appealPartiallyGranted" || this.state.status === "waitingCourtDecision"
                    || this.state.status === "courtDecision") &&
                        <div className="form__group">
                            <p className="form__item-label">Date interim response received:</p> 
                            <SingleDatePicker 
                                date={this.state.gotInterimResponseDate} // Passing in value of now()
                                onDateChange={this.onGotInterimResponseDateChange}
                                focused={this.state.gotInterimResponseDateCalendarFocused}
                                onFocusChange={this.onGotInterimResponseDateFocusChange}
                                numberOfMonths={1} // number of months that are displayed  
                                block={true}
                                isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())} // days after today's date aren't selectable
                            />           
                        </div>
                    }                
                    {/* ESTIMATED FINAL RESPONSE DATE - conditional input */}
                    {this.state.status === "extendedFinalResponseDate" &&
                        <div className="form__group">
                            <p className="form__item-label">Extended final response date (if given by agency):</p> 
                            <SingleDatePicker 
                                date={this.state.estFinalResponseDate} // Passing in value of now()
                                onDateChange={this.onEstFinalResponseDateChange}
                                focused={this.state.estFinalResponseCalendarFocused}
                                onFocusChange={this.onEstFinalResponseFocusChange}
                                numberOfMonths={1} // number of months that are displayed  
                                block={true}
                                isOutsideRange={() => false}
                            />                   
                        </div>
                    }                
                    {/* GOT FINAL RESPONSE DATE - conditional input */}
                    {(this.state.status === "recordsGranted" || this.state.status === "recordsDenied"
                        || this.state.status === "recordsPartiallyGranted" || this.state.status === "appealFiled" 
                        || this.state.status === "appealGranted" || this.state.status === "appealDenied"
                        || this.state.status === "appealPartiallyGranted" || this.state.status === "waitingCourtDecision"
                        || this.state.status === "courtDecision") &&
                        <div className="form__group">
                            <p className="form__item-label">Mailing date that agency issued final response:</p>
                            <SingleDatePicker 
                                date={this.state.gotFinalResponseDate} // Passing in value of now()
                                onDateChange={this.onGotFinalResponseDateChange}
                                focused={this.state.gotFinalResponseCalendarFocused}
                                onFocusChange={this.onGotFinalResponseFocusChange}
                                numberOfMonths={1} // number of months that are displayed
                                block={true} 
                                isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())} // days after today's date aren't selectable
                            />                                 
                        </div>
                    }
                    {/* APPEAL FILED DATE - conditional input */}
                    {(this.state.status === "appealFiled" || this.state.status === "appealGranted"
                    || this.state.status === "appealDenied" || this.state.status === "appealPartiallyGranted"
                    || this.state.status === "waitingCourtDecision" || this.state.status === "courtDecision") &&
                        <div className="form__group">
                            <p className="form__item-label">Date appeal with OOR was filed:</p> 
                            <SingleDatePicker 
                                date={this.state.appealFilingDate} // Passing in value of now()
                                onDateChange={this.onAppealFilingDateChange}
                                focused={this.state.appealFilingDateCalendarFocused}
                                onFocusChange={this.onAppealFilingDateFocusChange}
                                numberOfMonths={1} // number of months that are displayed 
                                block={true} 
                                isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())} // days after today's date aren't selectable
                                />                   
                        </div>
                    }
                    {/* GOT OOR FINAL DETERMINATION DATE - conditional input*/}
                    {(this.state.status === "appealGranted" || this.state.status === "appealDenied" 
                    || this.state.status === "appealPartiallyGranted" || this.state.status === "waitingCourtDecision"
                    || this.state.status === "courtDecision") &&
                        <div className="form__group">
                            <p className="form__item-label">Date OOR issued final determination: </p>
                            <SingleDatePicker 
                                date={this.state.gotFinalDetermDate} // Passing in value of now()
                                onDateChange={this.onGotFinalDetermDateChange}
                                focused={this.state.gotFinalDetermCalendarFocused}
                                onFocusChange={this.onGotFinalDetermFocusChange}
                                numberOfMonths={1} // number of months that are displayed  
                                block={true}
                                isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())} // days after today's date aren't selectable
                                />
                        </div>
                    }
                    {/*DATE ESTIMATOR */}
                    <div className="form__date-estimator">
                            <DateEstimator {...this.state} />
                    </div>        
                </div>
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
                    || this.state.status === "waitingCourtDecision" || this.state.status === "courtDecision") &&
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
                || this.state.status === "appealPartiallyGranted" || this.state.status === "waitingCourtDecision" 
                || this.state.status === "courtDecision") &&
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