import React from 'react';

const bold = {
    fontWeight:'bold',
    fontStyle: 'italic'
};

const FilingDeadlines = () => (
    <div>
        <h2>Filing deadlines</h2>
        <h3>Interim response</h3>
        <p>
            Due <span>5 business days</span> from the date an open records officer <span>receives</span> a request. This means holidays and weekends are excluded. Therefore:
        </p>    
            <ul>
                <li>
                    If a requester emails a request on Mon, Feb. 4, 2019, the agency’s interim response is due on or before Mon, Feb. 11.
                </li>
                <li>
                    If a requester emails a request on Sat, Feb. 2, 2019 the agency’s interim would also be due on or before Mon, Feb. 11, because the request was filed on a weekend and the agency wouldn’t consider the request ‘received’ until Mon, Feb. 4, 2019.
                </li>
                <li>
                    If a requester emails a request on Mon, Feb. 4, 2019 at 6pm, the request’s filing date would be considered Tues, Feb. 5 because the request was filed outside of business hours. The agency’s open records officer wouldn’t consider it received until Tuesday morning. Therefore, the agency’s interim response would be due on or before Tues, Feb. 12.
                </li>
            </ul>
        <p>
            Note: These timelines presume the request was submitted via email directly to the RTKL officer’s inbox. If a request is mailed, the date the agency's open records officer 'receives' the request will likely vary. Also, the state Office of Open Records has held that when an agency only operates on a part-time schedule as its regular business schedule, the computation of time rules will take that into account.  However, it is typically only very small agencies where this becomes an issue.
        </p>    
        <h3>Final response</h3>
        <p>Due on or before <span>30 calendar days</span> from the date an interim response has been issued. Therefore:</p>
        <ul>
            <li>
                If an agency issues an interim response on Mon, Feb 11, the final response will be due on Wed, March, 13.
            </li>
        </ul>
        <h3>OOR appeal</h3>
        <p>
            A requester can file an appeal to the Office of Open Records within <span>15 business days</span> of the date an agency issues a final response that denies or partially denies a request. The same applies to requests that are "deemed denied" (ie. an agency failed to provide an interim response or a final response before the deadlines described above). Therefore:
        </p>
        <ul>
            <li>
                If an agency’s final response is due on or before Wed, March 13 and it doesn’t provide a response on or before that day, the requester's request is ‘deemed denied’. The requester can file an appeal on or before Wed, April 3.
            </li>
            <li>
                If an agency emails its final response on Wed, March 13, denying access to records, a requester’s appeal must be filed on or before Wed, April 3.
            </li>
        </ul>
        <p>
            Note: The RTKL gives requesters 15 business days from the date of the agency’s response, which is not necessarily the same as it’s mailing date. Sometimes denial letters are dated one date and not mailed for several days later.  Additionally, sometimes the agency will mail hard copies of denials rather than send them via email.  The OOR generally bases this date off the postmark, but the issue hasn’t been addressed by the courts so there’s some gray area. 
        </p>
        <h3>Final determination</h3>
        <p>
            The OOR must issue a final determination on or before <span>30 calendar days</span> from the date it <span>receives</span> an appeal.
        </p>
        <p>
            The OOR's deadline operates slightly differently than an agency's deadline. According to state regulations, the business hours of the OOR are from 9:00 a.m. to 5:00 p.m. each weekday, except Saturdays, Sundays, legal holidays and emergency closings. Appeals filed by electronic mail or facsimile transmission are accepted up to 11:59:59 p.m. and will be date-stamped as being received that business day. Therefore:
        </p>
        <ul>
            <li>
            If a requester files an appeal electronically on 6pm, Wed April 3, the OOR would consider it filed on that day. Its final determination would be due on or before Sat, May 4.
            </li>
        </ul>
    </div>
);

export default FilingDeadlines