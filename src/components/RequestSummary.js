import React from 'react';

// <h3>Record response schedule:</h3>
// <p>Estimated interim response: {moment(this.state.filingDate).businessAdd(5).format('MMM-DD-YYYY')}</p>
// <p>Estimated final response date: {moment(this.state.finalResponseDate).format('MMM. DD, YYYY')}</p>


const RequestSummary = () => (
    <div className="page-header">
        <div className="content-container">
            <h1 className="page-header__title">
                New request
            </h1>
            <h2 className="page-header__title">
                Final response estimated in XX days
            </h2>
        </div>
    </div>
)

export default RequestSummary;