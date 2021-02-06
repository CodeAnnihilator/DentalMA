import React from 'react';

import styles from './note.module.scss';

interface INote {
	text: string;
	icon?: string;
	onClick?: () => void;
}

const Note = ({
	text,
	icon,
	onClick,
}: INote) => (
	<div className={styles.wrapper}>
		{text}.
		{onClick && <span><span className={styles.click} onClick={onClick}>Click</span>to check</span>}
		{icon && <img alt='' className={styles.icon} src={icon} />}
	</div>
);

export default Note;
