import React from 'react';
import cn from 'classnames';

import VerifiedSVG from 'resources/icons/verified.svg';

import styles from './optionPicker.module.scss';

interface IOptionPicker {
	options: Array<{icon: string, text: string, desc: string}>;
	activeId: number;
	enabled: number[];
	onSelect: (id: number) => void;
	title: string;
}

const OptionPicker = ({
	options,
	activeId,
	enabled,
	onSelect,
	title,
}: IOptionPicker) => (
	<div className={styles.wrapper}>
		<div className={styles.title}>{title}</div>
		{
			options.map(({icon, text, desc}, index) => {
				const isActive = index === activeId;
				const isDisabled = !enabled.some(el => el === index)
				return (
					<div
						key={index}
						onClick={() => isDisabled ? null : onSelect(index)}
						className={cn(
							styles.optionWrapper,
							{[styles.disabledOption]: isDisabled},
							{[styles.activeBg]: isActive},
						)}>
						<img className={styles.optionIcon} alt='' src={icon} />
						<div className={styles.textWrapper} key={index}>
							<div className={styles.text}>{text}</div>
							<div className={styles.desc}>{desc}</div>
						</div>
						<img className={cn(styles.statusIcon, {[styles.disabledIcon]: isDisabled})} alt='' src={VerifiedSVG} />
					</div>
				)
			})
		}
	</div>
);

export default OptionPicker;
