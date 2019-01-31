import React from 'react';
import dateEstimator from '../selectors/dateEstimator'

const DateEstimator = ({status, estInterimResponseDate, estFinalResponseDate, estAppealDeadline, estFinalDetermDate}) => (
    <div>
        <h3>
        Estimated timeline:
        </h3>
        <p>
            {dateEstimator(status, {
                estInterimResponseDate,
                estFinalResponseDate,
                estAppealDeadline,
                estFinalDetermDate,
            })}
        </p>
    </div>
)

export default DateEstimator;