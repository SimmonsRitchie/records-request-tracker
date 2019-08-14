import React from 'react';
import LoadingPage from '../../components/LoadingPage'
import { shallow } from 'enzyme'

// Using beforeEach, we can save ourselves from re-writing spies
// and the wrapper.
let wrapper;

beforeEach(() => {
    wrapper = shallow(<LoadingPage 
        />)
})

test('Should render LoadingPage correctly', () => {
    expect(wrapper).toMatchSnapshot()
});