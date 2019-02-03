import React from 'react';

// <h3>Record response schedule:</h3>
// <p>Estimated interim response: {moment(this.state.filingDate).businessAdd(5).format('MMM-DD-YYYY')}</p>
// <p>Estimated final response date: {moment(this.state.finalResponseDate).format('MMM. DD, YYYY')}</p>


const PageHeader = (props) => (
    <div className="page-header">
        <div className="content-container">
            <h1 className="page-header__title">
                {props.pageTitle}
            </h1>
        </div>
    </div>
)

export default PageHeader;