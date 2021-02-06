import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import HeaderFrame from '..';

describe('HeaderFrame', () => {
	it('renders the heading', () => {
		const component = shallow(HeaderFrame());
		expect(component).toMatchSnapshot('HeaderFrame');
	});
});
