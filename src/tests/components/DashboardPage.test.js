import React from 'react';
import { shallow } from 'enzyme';
import DashboardPage from '../../components/DashboardPage'

test('Should render DashboardPage with expenses', () => {
    const wrapper = shallow(<DashboardPage />)
    expect(wrapper).toMatchSnapshot();
});