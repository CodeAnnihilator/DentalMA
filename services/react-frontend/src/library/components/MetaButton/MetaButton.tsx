import cn from 'classnames';

import deleteSVG from 'resources/icons/delete.svg';

import styles from './metaButton.module.scss';

interface IMetaButton {
	value?: string;
	label: string;
	isActive?: boolean;
	onClick?: any;
	onRemove?: () => void;
}

const MetaButton = ({
	value,
	label,
	isActive,
	onClick,
	onRemove,
}: IMetaButton) => {
	return (
		<div
			onClick={!value ? onClick : null}
			className={cn(
				styles.active,
				{[styles.button]: !value},
				{[styles.current]: isActive},
			)}
		>
			<span className={styles.value}>{value ? value : label}</span>
			{ value && <img onClick={onRemove} className={styles.delete} alt='' src={deleteSVG} /> }
		</div>
	)
}

export default MetaButton;