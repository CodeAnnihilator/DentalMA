import cn from 'classnames';

import styles from './dotTextButton.module.scss';

interface IDotTextButton {
	color: string;
	text: string;
	isActive: boolean;
	onClick: (v: any) => void;
}

const DotTextButton = ({
	color,
	text,
	isActive,
	onClick,
}: IDotTextButton) => (
	<div onClick={isActive ? undefined : onClick} className={cn(styles.wrapper, {[styles.active]: isActive})}>
		<div className={styles.text}>{text}</div>
	</div>
);

export default DotTextButton;
