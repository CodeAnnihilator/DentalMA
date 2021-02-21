import styles from './dotTextButton.module.scss';

interface IDotTextButton {
	color: string;
	text: string;
}

const DotTextButton = ({
	color,
	text,
}: IDotTextButton) => (
	<div className={styles.wrapper}>
		<div className={styles.text}>{text}</div>
	</div>
);

export default DotTextButton;
