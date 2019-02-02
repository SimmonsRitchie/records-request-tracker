import React from 'react';
import dateEstimator from '../selectors/dateEstimator'

const DateEstimator = ({status, estInterimResponseDate, estFinalResponseDate, estAppealDeadline, estFinalDetermDate}) => (
    <div>
        <p className="date-estimator__title">
        Estimated timeline:
        </p>
        <p className="date-estimator__text">
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