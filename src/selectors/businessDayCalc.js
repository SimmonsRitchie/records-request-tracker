/*
BUSINESS DAY AND HOLIDAY CALCULATOR

This module takes a date, a number of business days, and then calculates a new date by adding the number
of business days to the former date.

A business day is any calendar day that is not a weekend or a holiday. Holidays are defined as objects and
listed in 'holidayList' below. The list currently features Pa. state gov holidays but can be expanded as needed
for other states, countries.

This modules solves a problem I faced while attempting to use existing business day calculation libraries.
The 'moment-business-days' library works well at excluding weekends but couldn't handle holidays.
Custom holidays could be added but it wasn't easy to add holidays that fall on different dates each year
(eg. MLK Day, Memorial Day)

/\/\/ API /\/\/ 

addBusinessAndHols(dateToCheck, businessDaysToAdd, options)

    Takes two required args: a date in ISO format (ie. '2009-12-23') or as a moment object, and the desired number
    of business days to add to this date. It returns a moment date object with the new date. It also takes a third 
    optional argument, 'options'. If options argument is given string "verbose", the function will return an object
    with the following items:

            startDate: date that function started counting from, ie. dateToCheck
            businessDaysToAdd: number of days that function added to dateToCheck
            endDate: final date calculated based on business days added
            countOfHols: number of holidays between startDate and endDate
            countOfNonBusinessDays: number of non business days between startDate and endDate
            countOfBusinessDays: number of business days between startDate and endDate
            calendarDayDiff: number of calendar days between startDate and endDate


checkIfHoliday(dateToCheck)

    Takes a single argument: An ISO formatted date or a date object. It returns true or false based on
    whether the date matches a list of holiday objects included in the function. To add or remove holidays,
    simply update the list included in this function.
    */

import moment from 'moment';


export const addBusinessAndHols = (dateToCheck, businessDaysToAdd, options) => {
    let countOfBusinessDays = 0
    let countOfHols = 0 // counter, result only return if verbose option is chosen
    let countOfNonBusinessDays = 0 // counter, result only return if verbose option is chosen
    let resultDate = moment(dateToCheck) // Converting dateToCheck date into moment object
    while (countOfBusinessDays !== businessDaysToAdd) { // Looping through each date and checking whether it's either a holiday or business day
        resultDate.add(1,'day')
        if (checkIfHoliday(resultDate)) {
            countOfHols += 1
        } else {
            if (resultDate.isoWeekday() !== 6 && resultDate.isoWeekday() !== 7) {
                countOfBusinessDays += 1
            } else {
                countOfNonBusinessDays += 1
            }
        }
    }
    if (options === "verbose") { // If 'verbose' flag is chosen as option, then we return an object with details about calculation
        return {
            startDate: moment(dateToCheck), // Initial date
            businessDaysToAdd,
            endDate: resultDate, // Final date calculated based on business days added
            countOfHols, // number of holidays between dateToCheck and resultDate
            countOfNonBusinessDays,
            countOfBusinessDays,
            calendarDayDiff: resultDate.diff(dateToCheck, 'days')
        }
    } else { // If no flags are chosen, we just return the resulting date after business days are added.
        return resultDate
    }
}


// This function checks whether a given date falls on a holiday or not
export const checkIfHoliday = (dateToCheck) => {
    
    /* HOLIDAY DEFINITIONS
    NOTE 1: Fixed and non-fixed holidays (aka. ones that change date each year) are formatted
    differently. The function handles them differently.
    Note
    NOTE 2: Fixed day holidays need to have values as two digit strings to ensure
    they're in ISO format and can be properly handled by moment.js */

    const nyd = {
        name: "New Year's Day",
        sameDayEachYear: true,
        month: "01",
        day: "01"       
    }

    const independence = {
        name: "Independence Day",
        sameDayEachYear: true,
        month: "07",
        day: "04"       
    }
    const veterans = {
        name: "Veteran's Day",
        sameDayEachYear: true,
        month: "11",
        day: "12"       
    }

    const xmas = {
        name: "Christmas",
        sameDayEachYear: true,
        month: "12",
        day: "25"       
    }
    
    const mlk = {
        name: "MLK day",
        sameDayEachYear: false,
        monthOfHol: "01",
        weekOfHol: 3,
        dayOfHol: 1
    }

    const presidents = {
        name: "President's Day",
        sameDayEachYear: false,
        monthOfHol: "02",
        weekOfHol: 3,
        dayOfHol: 1
    }

    const labor = {
        name: "Labor Day",
        sameDayEachYear: false,
        monthOfHol: "09",
        weekOfHol: 1,
        dayOfHol: 1    
    }

    const columbus = {
        name: "Columbus Day",
        sameDayEachYear: false,
        monthOfHol: "10",
        weekOfHol: 2,
        dayOfHol: 1    
    }

    const thanksgiving = {
        name: "Thanksgiving",
        sameDayEachYear: false,
        monthOfHol: "11",
        weekOfHol: 4,
        dayOfHol: 4    
    }

    const blackfri = {
        name: "Black Friday",
        sameDayEachYear: false,
        monthOfHol: "11",
        weekOfHol: 4,
        dayOfHol: 5    
    }
    
    const memorial = {
        name: "Memorial Day",
        sameDayEachYear: false,
        monthOfHol: "05",
        weekOfHol: 'last',
        dayOfHol: 1
    }
    
    const holidayList = [
        nyd,
        independence,
        veterans,
        xmas,
        mlk,
        presidents,
        labor,
        columbus,
        thanksgiving,
        blackfri,
        memorial
    ];

    // This function loops through all holiday objects in holiday list and determines what date they fall on in the year of dateToCheck
    // Eg. if dateToCheck is 2/3/2019, holiday dates for 2019 will be calculated.
    const year = moment(dateToCheck, holidayList).year()
    for (const holiday of holidayList) {
        // Below, function checks whether dateToCheck is the same as fixed date holidays (eg. Xmas, NYD)
        if (holiday.sameDayEachYear) {
            let holDate = moment(year + holiday.month + holiday.day)
            if (holDate.isSame(dateToCheck, 'day')) {
                return true;
            }
        // Below, function checks whether dateToCheck is the same as non-fixed date holidays (eg. MLK, Labor)
        } else {
            let holDate = getNonFixedHol(year,holiday) // a special function is called to determine date of non-fixed holiday
            if (holDate.isSame(dateToCheck, 'day')) {
                return true;
        }
        }
    }
    return false
}

    // This function calculates what date a non-fixed holiday falls on.
    // It makes a special calculation for non-fixed holidays, like Memorial Day, that fall based on the 'last' week of a month
    const getNonFixedHol = (year, {name, monthOfHol, weekOfHol, dayOfHol}) => {
        if (weekOfHol === 'last') {
            let date = moment(year + monthOfHol + "01") // First we get the date of the start of the month
            date = date.endOf('month') // Then we get date of end of the month
            while (date.isoWeekday() !== dayOfHol) { // We first check whether the last day of the month is the day we're looking for (Eg. Mon for Memorial Day, which equals 1 in .isoWeekDay)
                date.subtract(1,'days') // if it isn't the day we're looking for, we subtract one day and loop until we get the day we're looking for
            };
            return date
        } else {
            let date = moment(year + monthOfHol + "01") // similar to above, first we get the date of the start of the month
            let weekCount = 0
            while (weekOfHol !== weekCount) { // Then we loop through each day and check what day of the week it is.
                date.add(1,'day')
                if (dayOfHol === date.isoWeekday()) { //If day matches the day we're looking for, we break the loop and return the date
                    weekCount += 1
                }    
            };
            return date
    }
}

