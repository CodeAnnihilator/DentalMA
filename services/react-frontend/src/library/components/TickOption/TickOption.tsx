import React from 'react';
import cn from 'classnames';

import styles from './tickOption.module.scss';

import CheckIncompleteSVG from 'resources/icons/check-incomplete.svg';
import CheckCompleteSVG from 'resources/icons/check-complete.svg';

interface ITickOption {
	text: string;
	isCompleted: boolean;
	isActive: boolean;
	onComplete: () => void;
	onTickClick: () => void;
}

const TickOption = ({
	text,
	isCompleted,
	isActive,
	onComplete,
	onTickClick,
}: ITickOption) => (
	<div className={cn(styles.wrapper, {[styles.active]: isActive})} onClick={onTickClick}>
		<img className={styles.icon} alt='' src={isCompleted ? CheckCompleteSVG : CheckIncompleteSVG} />
		{text}
	</div>
);

export default TickOption;
