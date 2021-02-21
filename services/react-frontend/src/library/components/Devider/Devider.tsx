import styles from './devider.module.scss';

interface IDevider {
	type?: string;
}

const Devider = ({
	type,
}: IDevider) => (
	<div className={type === 'double' ? styles.doubleDevider : styles.devider} />
);

export default Devider;
