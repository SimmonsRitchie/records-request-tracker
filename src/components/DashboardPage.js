import React from 'react';
import RequestsListFilters from './RequestsListFilters'
import RequestsList from './RequestsList'
import DashboardSummary from './DashboardSummary';
import FiltersSummary from './FiltersSummary'

const DashboardPage = () => (
    <div>
        <DashboardSummary />
        <RequestsListFilters />
        <FiltersSummary />
        <RequestsList />
    </div>
);

export default DashboardPage;