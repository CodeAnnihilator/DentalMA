import React from 'react';

import styles from './textInput.module.scss';


const TextInput = (props: any) => (
	<input
		{...props}
		className={styles.textInput}
	/>
);

export default TextInput;
