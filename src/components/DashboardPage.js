import React from 'react';
import RequestsSummary from './RequestsSummary'
import RequestsListFilters from './RequestsListFilters'
import RequestsList from './RequestsList'



const DashboardPage = () => (
    <div>
        <RequestsSummary />
        <RequestsListFilters />
        <RequestsList />
    </div>
);

export default DashboardPage;