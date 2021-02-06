import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import configureI18n from '../i18n/configureI18n';

beforeAll(() => {
	configureI18n();
});

configure({adapter: new Adapter()});
