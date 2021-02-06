import React from 'react';

import styles from './select.module.scss';

interface ISelect {
	value: string | number;
	id?: string;
	label?: string;
	onChange?: () => void;
}

const Select = ({
	id,
	value,
	label,
	onChange,
}: ISelect) => (
	<div className={styles.wrapper}>
		<label htmlFor={id} className={styles.label}>{label}</label>
		<select id={id} defaultValue={value as any} onChange={onChange} className={styles.select}>
			<option value={0}>1</option>
			<option value={1}>2</option>
			<option value={2}>3</option>
			<option value={3}>4</option>
		</select>
	</div>
);

export default Select;
