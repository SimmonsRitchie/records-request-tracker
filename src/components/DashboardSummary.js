import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import getTotalActiveRequests from '../selectors/totalActiveRequests'

const DashboardSummary = (props) => (
    <div className="page-header">
        <div className="content-container">
            <h1 className="page-header__title">
                You have {props.totalActiveRequests} active requests
            </h1>
            <div className="page-header__actions">
                <Link className="button" to="/create">Add request</Link>
            </div>
        </div>
    </div>
)

const mapStateToProps = (state) => ({
    totalActiveRequests: getTotalActiveRequests(state.requests)
})


export default connect(mapStateToProps)(DashboardSummary);