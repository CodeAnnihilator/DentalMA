import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import localStorage from 'library/utilities/localStorage';
import en from 'resources/locales/en.json';

const locale = localStorage.getItem('locale');

if (!locale) localStorage.setItem('locale', 'en');

const lng = locale || localStorage.getItem('locale');

const configureI18n = async () => {
	await i18n.use(initReactI18next).init({
		lng,
		resources: {
			en: {translation: en},
		},
		interpolation: {
			escapeValue: false,
		},
	});
};

export default configureI18n;
