import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import listItemStatus from '../selectors/listItemStatus';

const RequestListItem = ({id, description, agency, details, filingDate, status, finalDetermDate, appealFilingDate}) => {
    
    // Trunctates length of details so easier to display
    const detailsExcerpt = details.length > 100 ? details.substring(0, 100) + "..." : details;

    // Provides a summary of status based on this.state.status
    const currentState = listItemStatus({status, finalDetermDate, appealFilingDate })

    return (
    <Link 
        className="list-item"
        to={`/edit/${id}`}
    >
        <div>
            <h3>
                {description}
            </h3>
            <span className="list-item__subtitle">
                Filed: {moment(filingDate).format('MMM Do, YYYY')}
            </span>
            <br></br>
            <span className="list-item__subtitle">
                {currentState}
            </span>
        </div>
        <h3
            className="list-item__data">
            {agency}
        </h3>

    </Link>
    )
}

export default RequestListItem;