import React from 'react';
import { connect } from 'react-redux'
import RequestsListItem from './RequestsListItem'

const RequestList = (props) => (
    <div className="content-container">
        <div className="list-header">
            <div className="show-for-mobile">Requests</div> {/*We want only one column, 'expenses', to appear in mobile*/}
            <div className="show-for-desktop">Request</div>
            <div className="show-for-desktop">Agency</div>
        </div>
        <div className="list-body">
            {props.requests.map((request, index) => {
                return <RequestsListItem key={request.id} {...request} />
            })}
        </div>
    </div>
)

const mapStateToProps = (state) => ({
    requests: state.requests
})

export default connect(mapStateToProps)(RequestList);