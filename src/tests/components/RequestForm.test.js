import React from 'react';
import { shallow } from 'enzyme';
import RequestForm from '../../components/RequestForm';
import requests from '../fixtures/requests'
import moment from 'moment';
import {SingleDatePicker} from 'react-dates'

test("Should render RequestForm correctly", () =>{
    const wrapper = shallow(<RequestForm />)
    expect(wrapper).toMatchSnapshot();
})

test('Should render RequestForm with request data', () => {
    const wrapper = shallow(<RequestForm request={requests[0]} />)
    expect(wrapper).toMatchSnapshot()
})

// Simulating user interaction using 'simulate'
test('Should render error for invalid form submission', () => {
    const wrapper = shallow(<RequestForm />);
    expect(wrapper).toMatchSnapshot(); // snapshot before changes made
    // Below, to stop jest from throwing an error, we have to add an object with
    // preventDefault inline function.
    wrapper.find('button').simulate('click', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot(); // snapshot after changes made
})

test('Should set description on input change',() => {
    const value = 'New description'
    const wrapper = shallow(<RequestForm />)
    // In this case, we're finding all the input tags and fetching the first (0)
    // index using 'at' method.
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('description')).toBe(value);
})

test('Should set new filing date on date change', () => {
    const now = moment()
    const wrapper = shallow(<RequestForm />);
    wrapper.find(SingleDatePicker).at(0).prop('onDateChange')(now)
    expect(wrapper.state('filingDate')).toEqual(now)
});

test('Check status has changed', () => {
    const value = "waitingFinalResponse"
    const wrapper = shallow(<RequestForm />);
    wrapper.find('select').simulate('change',{target: { value }});
    expect(wrapper.state('status')).toEqual(value)
});
