import { addBusinessAndHols } from '../../selectors/businessDayCalc'
import moment from 'moment'

test('Should calculate date for interim response in Feb', () => {
    const filingDate = "20190205"
    const result = addBusinessAndHols(filingDate, 5)
    const expectedResult = moment("20190212").valueOf()
    expect(result.valueOf()).toEqual(expectedResult)
})

test('Should calculate date for interim response before Xmas', () => {
    const filingDate = "20181224"
    const result = addBusinessAndHols(filingDate, 5)
    const expectedResult = moment("20190102").valueOf()
    expect(result.valueOf()).toEqual(expectedResult)
})

test('Should calculate date for interim response near Memorial Day', () => {
    const filingDate = "20190524"
    const result = addBusinessAndHols(filingDate, 5)
    const expectedResult = moment("20190603").valueOf()
    expect(result.valueOf()).toEqual(expectedResult)
})

test('Should calculate appeal deadline exclude Presidents Day', () => {
    const appealFilingDate = "20190204"
    const result = addBusinessAndHols(appealFilingDate, 15)
    const expectedResult = moment("20190226").valueOf()
    expect(result.valueOf()).toEqual(expectedResult)
})

test('Should calculate appeal deadline and exclude xmas, nyd', () => {
    const appealFilingDate = "20181224"
    const result = addBusinessAndHols(appealFilingDate, 15)
    const expectedResult = moment("20190116").valueOf()
    expect(result.valueOf()).toEqual(expectedResult)
})

test('Should calculate appeal deadline and exclude Veterans Day, Thanksgiving, BlackFri', () => {
    const appealFilingDate = "20191109"
    const result = addBusinessAndHols(appealFilingDate, 15)
    const expectedResult = moment("20191204").valueOf()
    expect(result.valueOf()).toEqual(expectedResult)
})