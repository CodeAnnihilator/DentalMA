import styles from './dot.module.scss';

interface IDot {
	color: string;
}

const Dot = ({
	color,
}: IDot) => (
	<div
		className={styles.dot}
		style={{backgroundColor: color}}
	/>
);

export default Dot;
