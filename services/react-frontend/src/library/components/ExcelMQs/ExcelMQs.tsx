import {useEffect, useState} from 'react';

import Dot from 'library/components/Dot';

import Modal from '../Modal';
import Table from '../Table';
import ImgButton from '../Buttons/ImgButton';
import Button from '../Buttons/SlimButton';

import MeasurementSVG from 'resources/icons/measurement.svg';
import tableSVG from 'resources/icons/table.svg';

import styles from './excelMQs.module.scss';

interface IExcelMQs {
	excelMQs: any[];
	colorMQById: (id: number) => string;
	onCreateMeasurement: () => void;
	requestExcelMQs: () => void;
}

const ExcelMQs = ({
	excelMQs,
	colorMQById,
	onCreateMeasurement,
	requestExcelMQs,
}: IExcelMQs) => {

	const [isModalOpen, toggleModal] = useState(false);

	useEffect(() => {
		requestExcelMQs();
	}, []);

	const totalDistance = (data: any, el: any) => parseFloat(el.distance) / data.reduce((c: any, n: any) => c + parseFloat(n.distance), 0);

	const orderedExcelMQs = excelMQs.map(o => ({
		id: o.id,
		name: o.name,
		groupId: o.groupId,
		toothId: o.toothId,
		time: o.time,
		substrate: o.substrate,
		location: o.location,
		colorId: o.colorId,
		distance: `${o.distance}um`,
		totalDistance: `${(totalDistance(excelMQs, o) * 100).toFixed(2)}%`
	}))

	const tHead = !!orderedExcelMQs[0] ? Object.keys(orderedExcelMQs[0]) : [];
	const tData = !!orderedExcelMQs[0] ? orderedExcelMQs.map((row: any) => Object.values({...row, colorId: (
		<Dot key={row[1]} color={colorMQById(row.colorId)} />
	)})) : [];

	return (
		<div className={styles.wrapper}>
			{
				isModalOpen && tData && (
					<Modal
						style={{width: '90%', height: '80%'}}
						bodyComponent={() => (
							<>
								<div
									className={styles.close}
									onClick={() => toggleModal(false)}
								>x</div>
								<Table
									head={tHead}
									data={tData as any}
									onRowClick={() => console.log('row clicked')}
								/>
							</>
						)}
					/>
				)
			}
			<ImgButton
				img={tableSVG}
				onClick={() => toggleModal(true)}
			/>
			<Button
				text='Create Measurement'
				icon={MeasurementSVG}
				onClick={onCreateMeasurement}
			/>
		</div>
	)
}

export default ExcelMQs;