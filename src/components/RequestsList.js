import React from 'react';
import { connect } from 'react-redux'
import RequestsListItem from './RequestsListItem'
import selectRequests from '../selectors/requestFilter'


const RequestList = (props) => (
    <div className="content-container">
        <div className="list-header">
            <div className="show-for-mobile">Requests</div> {/*We want only one column, 'expenses', to appear in mobile*/}
            <div className="show-for-desktop">Request</div>
            <div className="show-for-desktop">Agency</div>
        </div>
        <div className="list-body">
            {props.totalVisibleRequests === 0 ?
                <p className="list-body__no-items">
                    No requests to display.
                </p>
            :
                props.requests.map((request, index) => {
                    return <RequestsListItem key={request.id} request={request} />
                })
            }
        </div>
    </div>
)

const mapStateToProps = (state) => ({
    requests: selectRequests(state.requests, state.filters),
    totalVisibleRequests: selectRequests(state.requests, state.filters).length,
})

export default connect(mapStateToProps)(RequestList);