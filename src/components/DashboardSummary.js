import React from 'react';
import {Link} from 'react-router-dom'


const DashboardSummary = () => (
    <div className="page-header">
        <div className="content-container">
            <h1 className="page-header__title">
                You have filed XX requests
            </h1>
            <h2 className="page-header__title">
                Viewing X because of filters
            </h2>
            <div className="page-header__actions">
                <Link className="button" to="/create">Add request</Link>
            </div>
        </div>
    </div>
)

export default DashboardSummary;