import React from 'react';

import styles from './slimButton.module.scss';

interface ISlimButton {
	text: string;
	onClick?: () => void;
	icon?: string;
	color?: string;
	disabled?: boolean;
}

const Button = ({
	text,
	onClick,
	color,
	disabled,
}: ISlimButton) => (
	<div onClick={onClick} className={styles.wrapper} style={{backgroundColor: disabled ? 'silver' : color}}>
		{text}
	</div>
);

export default Button;
