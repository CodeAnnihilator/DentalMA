import cn from 'classnames';

import deleteSVG from 'resources/icons/delete.svg';

import styles from './metaButton.module.scss';

interface IMetaButton {
	value?: string;
	label: string;
}

const MetaButton = ({
	value,
	label,
}: IMetaButton) => {
	return (
		<div className={cn(styles.active, {[styles.button]: !value})}>
			<span className={styles.value}>{value ? value : label}</span>
			{ value && <img className={styles.delete} alt='' src={deleteSVG} /> }
		</div>
	)
}

export default MetaButton;