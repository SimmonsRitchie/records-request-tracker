import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom'

const RequestListItem = ({id, description, agency, details, createdAt}) => {
    
    // Trunctates length of details so easier to display
    const detailsExcerpt = details.length > 100 ? details.substring(0, 100) + "..." : details;

    return (
    <Link 
        className="list-item"
        to={`/edit/${id}`}
    >
        <div>
            <h3>
                {description}
            </h3>
            <span
                className="list-item__subtitle"
            >
                Filed: {moment(createdAt).format('MMM Do, YYYY')}
            </span>
            <br></br>
            <span
                className="list-item__subtitle"
            >
                {detailsExcerpt}
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