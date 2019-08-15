import React from 'react';
import { LoginPage } from '../../components/LoginPage'
import { shallow } from 'enzyme'

// Using beforeEach, we can save ourselves from re-writing spies
// and the wrapper.
let startLogin, wrapper;

beforeEach(() => {
    startLogin = jest.fn();
    wrapper = shallow(<LoginPage 
        startLogin={startLogin}
        />)
})


test('Should render LoginPage', () => {
    expect(wrapper).toMatchSnapshot()
})

test('Should call startLogin on button click', () => {
    // Below, we find the button tag and trigger 'onClick'
    // by simulating a click.
    wrapper.find('button').simulate('click')
    // We then check to see whether startLogin was
    // called
    expect(startLogin).toHaveBeenCalled()
});