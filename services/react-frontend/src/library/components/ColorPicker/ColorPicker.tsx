import React from 'react';
import cn from 'classnames';

import styles from './colorPicker.module.scss';

interface IColorPickerData {
	id: string;
	text: string;
	color: string;
}

interface IColorPicker {
	activeId: string;
	data: IColorPickerData[];
	onClick: (id: string) => void;
	title: string;
}

const ColorPicker = ({
	activeId,
	data,
	onClick,
	title,
}: IColorPicker) => (
	<div className={styles.wrapper}>
		<div className={styles.title}>{title}</div>
		{
			data.map(option => (
				<div
					key={option.id}
					className={cn(styles.optionWrapper, {[styles.activeBg]: option.id === activeId})}
					onClick={() => onClick(option.id)}
				>
					<div className={styles.circle} style={{backgroundColor: option.color}} />
					<div className={styles.text}>{option.text}</div>
					{
						option.id !== activeId
							? <div className={styles.pick}>pick</div>
							: <div className={styles.selected}>selected</div>
					}
				</div>
			))
		}
	</div>
);

export default ColorPicker;
