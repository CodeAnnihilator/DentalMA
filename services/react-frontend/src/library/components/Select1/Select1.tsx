import React, {ReactNode} from 'react';

import styles from './select1.module.scss';

interface ISelect {
	id?: string;
	label?: string;
	onChange?: (e: any) => void;
	children: ReactNode;
}

const Select1 = ({
	id,
	label,
	onChange,
	children,
}: ISelect) => (
	<div className={styles.wrapper}>
		<label htmlFor={id} className={styles.label}>{label}</label>
		<select id={id} onChange={onChange} className={styles.select}>
			{children}
		</select>
	</div>
);

export default Select1;
