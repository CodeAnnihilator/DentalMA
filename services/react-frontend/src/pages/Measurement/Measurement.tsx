import React, {useState} from 'react';

import Tabs from 'library/components/Tabs';
import SubHeader from 'library/components/SubHeader';

import Measurement from './Frames/Measurement';
import Settings from './Frames/Settings';

import styles from './measurement.module.scss';

const Measurements = () => {

	const [activeTab, setActiveTab] = useState(0);

	return (
		<div className={styles.wrapper}>
			<SubHeader bottomBorder bg='#f4f5f7'>
				<Tabs
					data={['Settings', 'Measurement']}
					onSelectTab={setActiveTab}
					activeTab={activeTab}
				/>
				<div className={styles.marks}>
					<div className={styles.mark}>magnification: <span className={styles.markValue}>400 μm</span></div>
				</div>
			</SubHeader>
			{!!activeTab ? <Measurement /> : <Settings />}
		</div>
	);
};

export default Measurements;
