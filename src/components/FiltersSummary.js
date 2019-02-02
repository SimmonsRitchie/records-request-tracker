import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import selectRequests from '../selectors/requestFilter'

const FiltersSummary = (props) => (
    <div className="content-container">
        <div className="filters-summary">
            <h3 className="page-header__title">
                Viewing {props.visibleRequests} of {props.totalRequests} requests.
            </h3>
        </div>
    </div>
)

const mapStateToProps = (state) => ({
    totalRequests: state.requests.length,
    visibleRequests: selectRequests(state.requests, state.filters).length
})


export default connect(mapStateToProps)(FiltersSummary);