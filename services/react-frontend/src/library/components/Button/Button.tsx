import React from 'react';

import styles from './button.module.scss';

interface IButton {
	text: string;
	onClick: () => void;
	icon?: string;
	color?: string;
	disabled?: boolean;
}

const Button = ({
	text,
	onClick,
	icon,
	color,
	disabled,
}: IButton) => (
	<div onClick={onClick} className={styles.wrapper} style={{backgroundColor: disabled ? 'silver' : color}}>
		{text}
		<img alt='' className={styles.image} src={icon} />
	</div>
);

export default Button;
