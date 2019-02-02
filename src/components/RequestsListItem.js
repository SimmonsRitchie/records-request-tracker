import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import requestStatus from '../selectors/requestStatus';

const RequestListItem = (props) => {
    
    // Provides a summary of status based on this.state.status
    const statusSummary = requestStatus({...props.request})

    return (
    <Link 
        className="list-item"
        to={`/edit/${props.request.id}`}
    >
        <div>
            <h3>
                {props.request.description}
            </h3>
            <span className="list-item__subtitle">
                Filed: {moment(props.request.filingDate).format('MMM Do, YYYY')}
            </span>
            <br></br>
            <span className="list-item__subtitle">
                {statusSummary}
            </span>
        </div>
        <h3
            className="list-item__data">
            {props.request.agency}
        </h3>

    </Link>
    )
}

export default RequestListItem;