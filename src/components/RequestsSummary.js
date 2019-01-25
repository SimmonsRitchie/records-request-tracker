import React from 'react';
import {Link} from 'react-router-dom'


const RequestsSummary = () => (
    <div>
        <p>Requests summary</p>
        <Link className="button" to="/create">Track request</Link>
    </div>
)

export default RequestsSummary;