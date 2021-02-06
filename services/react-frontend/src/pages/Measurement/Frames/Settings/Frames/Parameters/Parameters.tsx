import React from 'react';
import Select from 'react-select';

import styles from './parameters.module.scss';

import TextInput from 'library/components/Input';

const selectStyles = {
	control: (styles: any) => ({
		...styles,
		border: '1px solid #e4e4e4',
		minWidth: 300,
		fontSize: '0.8em'
	}),
}

const options = [
	{ value: '0' , label: `0` },
	{ value: '1', label: `1` },
	{ value: '2', label: `2` }
]

const Parameters = () => {

	return (
		<div className={styles.wrapper}>
			<div className={styles.innerWrapper}>
				<TextInput placeholder='Group ID' />
				<TextInput placeholder='Tooth ID' />
				<Select
					placeholder='Time'
					options={options}
					styles={selectStyles}
				/>
				<Select
					placeholder='Substrate'
					options={options}
					styles={selectStyles}
				/>
				<Select
					placeholder='Location'
					options={options}
					styles={selectStyles}
				/>
			</div>
		</div>
	);

};

export default Parameters;
