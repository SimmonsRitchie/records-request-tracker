import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import requestStatus from '../selectors/requestStatus';

const RequestListItem = (props) => {
    
    // Provides a summary of status based on this.state.status
    const statusSummary = requestStatus({...props.request})

    return (
    <Link 
        to={`/edit/${props.request.id}`}
        className="list-item__container-outer"
    >
        <div className="list-item__container-left">
            <h3 className="list-item__title">
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
        <div className="list-item__container-right">
          <div className="show-for-desktop">
            <h3 className="list-item__agency">{props.request.agency}</h3>
          </div>
        </div>
    </Link>
    )
}

export default RequestListItem;