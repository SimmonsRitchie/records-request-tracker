import React from 'react';
import PageHeader from './PageHeader'
import FilingDeadlines from './FilingDeadlines'

const RtkGuidePage = () => (
    <div>
        <PageHeader 
            pageTitle={"RTK Guide"}
        />
        <div className="content-container rtk-guide">
            <FilingDeadlines />
        </div>
    </div>
);

export default RtkGuidePage