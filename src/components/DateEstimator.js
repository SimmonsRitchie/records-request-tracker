/* This component uses dateEstimator logic to determine display text */

import React from 'react';
import dateEstimateText from '../selectors/dateEstimateText'
import dateEstimateBreakdown from '../selectors/dateEstimateBreakdown'
import ReactTooltip from 'react-tooltip';


const DateEstimator = ({
    status,
    filingDate,
    estInterimResponseDate,
    estFinalResponseDate,
    estAppealDeadline,
    estFinalDetermDate}) => (
    <div className="date-estimatorr">
        <p className="date-estimator__title">
        Estimated timeline:
        </p>
        <div className="form__label-container">
            {/*GET TEXT TO DISPLAY BASED ON DATE ESTIMATE*/}
            <p className="date-estimator__text">
                {dateEstimateText(status, {
                    estInterimResponseDate,
                    estFinalResponseDate,
                    estAppealDeadline,
                    estFinalDetermDate
                })}
            </p>
            {/*TOOLTIP - PROVIDES BREAKDOWN OF DATE ESTIMATE*/}
            <span>
                <img
                    className="form__tooltip-image"
                    src="/images/tooltip.svg"
                    data-tip
                    data-for='dateEstimator'
                />
            </span>
            <ReactTooltip id="dateEstimator" type="info">
                {dateEstimateBreakdown(status)}
            </ReactTooltip>
        </div>
    </div>
)

export default DateEstimator;