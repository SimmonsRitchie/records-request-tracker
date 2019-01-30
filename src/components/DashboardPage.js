import React from 'react';
import RequestsListFilters from './RequestsListFilters'
import RequestsList from './RequestsList'
import DashboardSummary from './DashboardSummary';


const DashboardPage = () => (
    <div>
        <DashboardSummary />
        <RequestsListFilters />
        <RequestsList />
    </div>
);

export default DashboardPage;