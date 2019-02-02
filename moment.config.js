import moment from 'moment'


const nyd19 = '01-01-2019';
const mlk19 = '01-21-2019';
const president19 = '02-18-2019';
const memorial19 = '05-27-2019';
const july19 = '07-04-2019';
const labor19 = '09-02-2019';
const columnbus19 = '10-14-2019';
const veteran19 = '11-11-2019';
const thanksgiving19 = '11-28-2019';
const blackfri19 = '11-29-2019';
const xmas19 = '12-25-2019';


const govHolidays = [
    nyd19,
    mlk19,
    president19,
    memorial19,
    july19,
    labor19,
    columnbus19,
    veteran19,
    thanksgiving19,
    blackfri19,
    xmas19,
]

export const momentHolidayConfig = () => {
    moment.updateLocale('us', {
        holidays: govHolidays,
        holidayFormat: 'MM-DD-YYYY'
    });
} 

