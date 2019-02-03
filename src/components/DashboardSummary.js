import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { getTotalActiveRequests, getTotalGrantedRequests, getTotalDeniedRequests } from '../selectors/requestCounter'

const DashboardSummary = (props) => (
    <div className="page-header">
        <div className="content-container">
            {props.totalRequests === 0 ? 
            <div>
                <h1 className="page-header__title">
                    You haven't filed any requests.
                </h1>
            </div> :
            <div> 
                <h1 className="page-header__title">
                    You have filed <span>{props.totalRequests}</span> {props.totalRequests === 1 ? "request" : "requests"}.
                </h1>
                <h3 className="page-header__subtitle">
                    <span className="page-header__subtitle--active">{props.totalActiveRequests}</span> active.
                    <span className="page-header__subtitle--granted"> {props.totalGrantedRequests}</span> granted.
                    <span className="page-header__subtitle--denied"> {props.totalDeniedRequests}</span> denied.
                </h3>
            </div>
}
            <div className="page-header__actions">
                <Link className="button" to="/create">Add request</Link>
            </div>
        </div>
    </div>
)

const mapStateToProps = (state) => ({
    totalRequests: state.requests.length,
    totalActiveRequests: getTotalActiveRequests(state.requests),
    totalGrantedRequests: getTotalGrantedRequests(state.requests),
    totalDeniedRequests: getTotalDeniedRequests(state.requests)
})


export default connect(mapStateToProps)(DashboardSummary);