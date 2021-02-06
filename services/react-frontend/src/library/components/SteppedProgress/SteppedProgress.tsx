import React, {useEffect, useState} from 'react';

import styles from './steppedProgress.module.scss';

interface ICoord {
	coord: number[];
	colorId: string;
}

interface ISteppedProgress {
	width?: number;
	height?: number;
	data: ICoord[];
}

interface IDistance {
	colorId: string;
	distance: number;
}

const colorMap = [
	{id: '0', color: '#A4FF91'},
	{id: '1', color: '#91FFF8'},
	{id: '2', color: '#91AFFF'},
	{id: '3', color: '#FBFF91'},
	{id: '4', color: '#FFC391'},
	{id: '5', color: '#FF9791'},
	{id: '6', color: '#D691FF'},
];

const getPickerColorById = (colorId: string) => {
	const colorObj = colorMap.find(({id}) => id === colorId);

	return colorObj?.color || colorMap[0].color;
};

const lenpoint = (coordA: number[], coordB: number[]) => {
	const a = coordA[0] - coordB[0];
	const b = coordA[1] - coordB[1];

	return Math.hypot(a, b);
};

const getDistancePassed = (distances: any, totalDistance: number, i: number) => {
	const range = distances.slice(0, i + 1);
	const accumedRange = range.reduce((c: number, n: IDistance) => c + n.distance, 0);

	return accumedRange / totalDistance;
};

const SteppedProgress = ({
	width,
	height,
	data,
}: ISteppedProgress) => {

	const [nextStyles, setNextStyles] = useState({} as any);

	useEffect(() => {

		const newDistances = data.reduce((c, n, i, arr) => {
			if (i === 0) return [];
			const distance = lenpoint(arr[i - 1].coord, n.coord);

			return c.concat({colorId: n.colorId, distance});
		}, [] as IDistance[]);

		const totalDistance = newDistances.reduce((c, n) => c + n.distance, 0);

		const newPercentDistances = newDistances.map((distanceObj, i, arr) => ({
			...distanceObj,
			distance: getDistancePassed(arr, totalDistance, i),
		}));

		const backgroundImage = newPercentDistances.reduce((c, n, i, arr) => {
			const devider = `${i === 0 || i > arr.length ? '' : ','}`;
			const color = getPickerColorById(n.colorId);

			return `${c}${devider}linear-gradient(${color},${color})`;
		}, '');

		const backgroundSize = newPercentDistances.reduce((c, n, i, arr) => {
			const devider = `${i === 0 || i > arr.length ? '' : ','}`;
			const percDistance = parseInt((n.distance * 100).toFixed(), 10);

			return `${c}${devider}${percDistance}%`;
		}, '');

		setNextStyles({backgroundImage, backgroundSize});

	}, [data]);

	return (
		<div style={{width}} className={styles.progressWrapper}>
			{console.log(nextStyles)}
			<div className={styles.progress} style={{...nextStyles, height}} />
		</div>
	);
};

export default SteppedProgress;
