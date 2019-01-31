import React from 'react';
import RequestSummary from './RequestSummary'
import FilingDeadlines from './FilingDeadlines'

const RtkGuidePage = () => (
    <div>
        <RequestSummary 
            pageTitle={"RTK Guide"}
        />
        <div className="content-container">
            <FilingDeadlines />
        </div>
    </div>
);

export default RtkGuidePage