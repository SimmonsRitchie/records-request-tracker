import React from 'react';
import { SingleDatePicker, isInclusivelyBeforeDay } from 'react-dates'
import ReactTooltip from 'react-tooltip';
import { HashLink as Link } from 'react-router-hash-link';
import moment from 'moment-business-days';
import DateEstimator from './DateEstimator';
import { addBusinessAndHols } from '../selectors/businessDayCalc'

/*TO DO: May need to adjust addBusinessDayCalc to account for what happens when
filing requests on a holiday */


/* The arrays below are created to cut down the size of if statements in render method. They're used for determining
when to display certain date pickers depending on the request's status. Eg. if a user doesn't have an interim
response yet, we don't want to display a date picker asking them when they received a final response. */

const displayInterimResponseTerms = [
    "waitingFinalResponse",
    "extendedFinalResponseDate",
    "recordsGranted",
    "recordsDenied", 
    "recordsPartiallyGranted",
    "appealFiled",
    "extendedFinalDetermDate",
    "appealGranted",
    "appealDenied",
    "appealPartiallyGranted",
    "waitingCourtDecision",
    "courtGranted"
]
const displayGotFinalResponseTerms = [
    "recordsGranted",
    "recordsDenied", 
    "recordsPartiallyGranted",
    "appealFiled",
    "extendedFinalDetermDate",
    "appealGranted",
    "appealDenied",
    "appealPartiallyGranted",
    "waitingCourtDecision",
    "courtGranted"
]

const displayAppealFiledTerms = [
    "appealFiled",
    "extendedFinalDetermDate",
    "appealGranted",
    "appealDenied",
    "appealPartiallyGranted",
    "waitingCourtDecision",
    "courtGranted"
]

const displayGotFinalDetermTerms = [
    "appealGranted",
    "appealDenied",
    "appealPartiallyGranted",
    "waitingCourtDecision",
    "courtGranted"
]

const displayDateEstimatorTerms = [
    "waitingInterimResponse",
    "waitingFinalResponse",
    "extendedFinalResponseDate",
    "recordsDenied", 
    "recordsPartiallyGranted",
    "appealFiled",
    "extendedFinalDetermDate"
]


class RequestForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: props.request ? props.request.status : "waitingInterimResponse",
            description: props.request ? props.request.description : "",
            agency: props.request ? props.request.agency : "",
            filingDate: props.request ? moment(props.request.filingDate) : moment(),
            estInterimResponseDate: props.request ? moment(props.request.estInterimResponseDate) : addBusinessAndHols(moment(),5),
            gotInterimResponseDate: props.request ? moment(props.request.gotInterimResponseDate) : moment(),
            estFinalResponseDate: props.request ? moment(props.request.estFinalResponseDate) : moment().add(30,'days'),
            gotFinalResponseDate: props.request ? moment(props.request.gotFinalResponseDate) : moment(),
            estAppealDeadline: props.request ? moment(props.request.estAppealDeadline) : addBusinessAndHols(moment(),15),   
            appealFilingDate: props.request ? moment(props.request.appealFilingDate) : moment(),    
            estFinalDetermDate: props.request ? moment(props.request.estFinalDetermDate) : moment().add(30,'days'),    
            gotFinalDetermDate: props.request ? moment(props.request.gotfinalDetermDate) : moment(),
            details: props.request ? props.request.details : "",
            note: props.request ? props.request.note : "",
            denialReason: props.request ? props.request.denialReason : "",
            finalDetermDetails: props.request ? props.request.finalDetermDetails : "",
            filingDateCalendarFocused: false,
            gotInterimResponseDateCalendarFocused: false,
            estFinalResponseCalendarFocused: false,
            gotFinalResponseCalendarFocused: false,
            appealFilingDateCalendarFocused: false,
            estFinalDetermCalendarFocused: false,
            gotFinalDetermCalendarFocused: false,
            modalIsOpen: false,
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
            this.setState(() => ({ error: `Max of ${maxLength} characters for description. You can add more detail below.`}))
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
            const estInterimResponseDate = addBusinessAndHols(filingDate, 5) // interim response is due on or before 5 business days
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
    // DATE - EST FINAL RESPONSE (this is called only when agency requests final response existension)
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
            const estAppealDeadline = addBusinessAndHols(gotFinalResponseDate, 15) // OOR appeal filing date is on or before 15 business days
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
        // DATE - EST FINAL RESPONSE (this is called only when agency requests final response existension)
    onEstFinalResponseDateChange = (estFinalResponseDate) => {
        if (estFinalResponseDate) { //using an If statement here to prevent user from clearing value
            this.setState(() => ({ estFinalResponseDate }));
        }
    };
    onEstFinalResponseFocusChange = ({ focused }) => {
        this.setState(() => ({ estFinalResponseCalendarFocused: focused }))
    }
    // DATE - EST FINAL RESPONSE (this is called only when OOR requests extension for final determination)
    onEstFinalDetermDateChange = (estFinalDetermDate) => {
        if (estFinalDetermDate) { //using an If statement here to prevent user from clearing value
            this.setState(() => ({ estFinalDetermDate }));
        }
    };
    onEstFinalDetermFocusChange = ({ focused }) => {
        this.setState(() => ({ estFinalDetermCalendarFocused: focused }))
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
    const maxLength = 10000
    if (details.length > maxLength) {
        this.setState(() => ({ error: `Max of ${maxLength} characters for details.`}))
    } else {
        this.setState(() => ({
            error: "", 
            details
        }))
    }
};
    // NOTE
    onNoteChange = (e) => {
    const note = e.target.value
    const maxLength = 10000
    if (note.length > maxLength) {
        this.setState(() => ({ error: `Max of ${maxLength} characters for note.`}))
    } else {
        this.setState(() => ({
            error: "", 
            note
        }))
    }
};    
    // DENIAL
    onDenialReasonChange = (e) => {
    const denialReason = e.target.value
    const maxLength = 10000
    if (denialReason.length > maxLength) {
        this.setState(() => ({ error: `Max of ${maxLength} characters for denial reason.`}))
    } else {
        this.setState(() => ({
            error: "", 
            denialReason
        }))
    }
};    
    // DETAILS OF OOR APPEAL
    onFinalDetermDetailsChange = (e) => {
    const finalDetermDetails = e.target.value
    const maxLength = 10000
    if (finalDetermDetails.length > maxLength) {
        this.setState(() => ({ error: `Max of ${maxLength} characters for notes about final determination.`}))
    } else {
        this.setState(() => ({
            error: "", 
            finalDetermDetails
        }))
    }
};    
    // ON SUBMIT
    onSubmit = (e) => {
        e.preventDefault(); //Stops page from refreshing
        if (this.state.description === "" || this.state.agency === "") {
            this.setState(() => ({ error: "Please provide a description and an agency."}))
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
                estFinalDetermDate: this.state.estFinalDetermDate.valueOf(),
                gotFinalDetermDate: this.state.gotFinalDetermDate.valueOf(),
                details: this.state.details,
                note: this.state.note,
                denialReason: this.state.denialReason,
            })
        }
    }

    render() {
        return (
            <div className="form">
            {this.state.error &&
                <p className="form__error" id="error">
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
                        <option value="extendedFinalResponseDate">Agency requests extension for final response</option>
                        <option value="appealFiled">Appeal filed</option>
                        <option value="appealGranted">Request granted on appeal</option>
                        <option value="appealPartiallyGranted">Request partially granted on appeal</option>
                        <option value="appealDenied">Request denied on appeal</option>
                        <option value="extendedFinalDetermDate">OOR requests extension for appeal decision</option> {/*TODO: Add another datepicker for revised date */}
                        <option value="waitingCourtDecision">Agency/third parties challenge appeal decision in court</option>
                        <option value="courtGranted">Request granted by courts</option>
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
                        <div className="form__label-container">
                            <p className="form__item-label">
                                Date request filed:
                            </p>
                            {/*TOOLTIP*/}
                            <span>
                                <img
                                    className="form__tooltip-image"
                                    src="/images/tooltip.svg"
                                    data-tip
                                    data-for='filingDate'
                                />
                            </span>
                            <ReactTooltip id="filingDate" type="info">
                                <span>Note: If request was filed after 5 p.m. then enter next day as filing date.</span>
                            </ReactTooltip>
                        </div>
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
                    {displayInterimResponseTerms.includes(this.state.status) &&
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
                    {/* EXTENDED FINAL RESPONSE DATE - conditional input */}
                    {this.state.status === "extendedFinalResponseDate" &&
                        <div className="form__group">
                            <p className="form__item-label">Extended final response date given by agency:</p> 
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
                    {displayGotFinalResponseTerms.includes(this.state.status) &&
                        <div className="form__group">
                            <p className="form__item-label">Date agency issued final response:</p>
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
                    {displayAppealFiledTerms.includes(this.state.status) &&
                        <div className="form__group">
                            <div className="form__label-container">
                                <p className="form__item-label">Date appeal with OOR was filed:</p>
                                {/*TOOLTIP*/}
                                <span>
                                    <img
                                        className="form__tooltip-image"
                                        src="/images/tooltip.svg"
                                        data-tip
                                        data-for='appealFilingDate'
                                    />
                                </span>
                                <ReactTooltip id="appealFilingDate" type="info">
                                    <span>Note: Appeals filed electronically are accepted by the Office of Open Records up until 11:59pm</span>
                                </ReactTooltip> 
                            </div>
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
                    {/* EXTENDED FINAL DETERMINATION DATE - conditional input */}
                    {this.state.status === "extendedFinalDetermDate" &&
                        <div className="form__group">
                            <p className="form__item-label">Extended final determination date given by OOR:</p> 
                            <SingleDatePicker 
                                date={this.state.estFinalDetermDate} // Passing in value of now()
                                onDateChange={this.onEstFinalDetermDateChange}
                                focused={this.state.estFinalDetermCalendarFocused}
                                onFocusChange={this.onEstFinalDetermFocusChange}
                                numberOfMonths={1} // number of months that are displayed  
                                block={true}
                                isOutsideRange={() => false}
                            />                   
                        </div>
                    }                           
                    {/* GOT OOR FINAL DETERMINATION DATE - conditional input*/}
                    {displayGotFinalDetermTerms.includes(this.state.status) &&
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
                    {/*DATE ESTIMATOR - conditional - won't appear if request granted or appeal granted */}
                    {displayDateEstimatorTerms.includes(this.state.status) &&
                            <DateEstimator {...this.state} />
                        }        
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
                    || this.state.status === "waitingCourtDecision" || this.state.status === "courtGranted") &&
                    <div className="form__group">
                        <p className="form__item-label">Reason agency denied or partially denied request:</p>
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
                || this.state.status === "courtGranted") &&
                        <div className="form__group">
                            <p className="form__item-label">Notes about OOR's final determination:</p>                   
                            <textarea
                                className="textarea"
                                type="text"
                                name="finalDetermDetails"
                                value={this.state.finalDetermDetails}
                                onChange={this.onFinalDetermDetailsChange} 
                            />
                        </div>
                }
                    <Link className="link" to="/create#error">
                        <button
                            className="button"
                            onClick={this.onSubmit}
                        >
                            Save request
                        </button>
                    </Link>
            </div>
        )
    }
}

export default RequestForm;