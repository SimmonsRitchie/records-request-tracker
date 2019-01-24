// Shallow rendering is different from 'full dom rendering', doesn't
// render child components
import ReactShallowRenderer from 'react-test-renderer/shallow';
import React from 'react';
import { Header } from '../../components/Header'
import { shallow } from 'enzyme'

// Using beforeEach, we can save ourselves from re-writing spies
// and the wrapper.
let startLogout, wrapper;

beforeEach(() => {
    startLogout = jest.fn();
    wrapper = shallow(<Header 
        startLogout={startLogout}
        />)
})

test('Should render Header correctly', () => {
    expect(wrapper).toMatchSnapshot()
});

test('Should call start Logout on button click', () => {
    // Below, we find the button tag and trigger 'onClick'
    // by simulating a click.
    wrapper.find('button').simulate('click')
    // We then check to see whether startLogout was called
    expect(startLogout).toHaveBeenCalled()
});