import React from 'react';
import cn from 'classnames';

import styles from './tabs.module.scss';

interface ITabs {
	data: string[];
	activeTab?: number;
	onSelectTab: (id: number) => void;
}

const Tabs = ({
	data,
	activeTab = 0,
	onSelectTab
}: ITabs) => (
	<div className={styles.container}>
		{
			data.map((text, i) => (
				<div
					key={i}
					className={cn(styles.tab, {[styles.active]: activeTab === i})}
					onClick={() => onSelectTab(i)}
				>{text}</div>
			))
		}
	</div>
);

export default Tabs;
