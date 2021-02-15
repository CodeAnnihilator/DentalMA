import React, {useState, useRef, BaseSyntheticEvent} from 'react';

import styles from './measurement.module.scss';
import ColorPicker from 'library/components/ColorPicker';

const pickerData = [
	{id: '0', color: '#A4FF91', text: 'MQ1'},
	{id: '1', color: '#91FFF8', text: 'MQ2'},
	{id: '2', color: '#91AFFF', text: 'MQ3'},
	{id: '3', color: '#FBFF91', text: 'MQ4'},
	{id: '4', color: '#FFC391', text: 'MQ5'},
	{id: '5', color: '#FF9791', text: 'MQ6'},
	{id: '6', color: '#D691FF', text: 'MQ7'},
];

const getPickerColorById = (colorId: string) => {
	const colorObj = pickerData.find(({id}) => id === colorId);

	return colorObj?.color || pickerData[0].color;
};

interface IMouseEvent extends BaseSyntheticEvent {
	clientX: number;
	clientY: number;
}

interface ICoord {
	coord: number[];
	colorId: string;
}

const Measurement = () => {

	const [activeId, onPickerColorSwitch] = useState('0');
	const [coords, setNextCoord] = useState([] as ICoord[]);

	const canvasRef = useRef<HTMLCanvasElement>(null);

	const onHandlePickerClick = (id: string) => onPickerColorSwitch(id);

	const getCanvasAndContext = () => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext('2d');
		if (!ctx || !canvas) return {canvas: null, ctx: null};

		return {canvas, ctx};
	};

	const getNextCoordinate = (e: IMouseEvent) => {
		const {canvas} = getCanvasAndContext();
		if (!canvas) return [];
		const rect = canvas.getBoundingClientRect();
		const scaleX = canvas.width / rect.width;
		const scaleY = canvas.height / rect.height;
		const x = (e.clientX - rect.left) * scaleX;
		const y = (e.clientY - rect.top) * scaleY;

		return [x, y] as number[];
	};

	const clearCanvas = (canvas: HTMLCanvasElement) => {
		const ctx = canvas?.getContext('2d');
		if (!ctx || !canvas) return;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	};

	const drawShapes = (ctx: CanvasRenderingContext2D, drawCoords: ICoord[]) => {
		// draw lines
		drawCoords.forEach(({coord, colorId}, i: number) => {
			ctx.beginPath();
			if (i !== 0) ctx.moveTo(drawCoords[i - 1].coord[0], drawCoords[i - 1].coord[1]);
			ctx.lineTo(coord[0], coord[1]);
			ctx.strokeStyle = getPickerColorById(colorId);
			ctx.lineWidth = 5;
			ctx.stroke();
		});
		// draw circles
		drawCoords.forEach(({coord, colorId}) => {
			ctx.beginPath();
			ctx.moveTo(coord[0], coord[1]);
			ctx.arc(coord[0], coord[1], 10, 0, 2 * Math.PI);
			ctx.fillStyle = getPickerColorById(colorId);
			ctx.fill();
		});
	};

	const drawCursorLine = (
		ctx: CanvasRenderingContext2D,
		lastCoord: number[],
		nextCoord: number[],
	) => {
		ctx.beginPath();
		ctx.moveTo(lastCoord[0], lastCoord[1]);
		ctx.lineTo(nextCoord[0], nextCoord[1]);
		ctx.strokeStyle = getPickerColorById(activeId);
		ctx.stroke();
	};

	const mouseDownHandler = (e: IMouseEvent) => {
		const nextCoord = getNextCoordinate(e);
		const nextCoordObject = {coord: nextCoord, colorId: activeId};
		const newCoords = coords.concat(nextCoordObject);
		const {canvas, ctx} = getCanvasAndContext();
		if (!canvas || !ctx) return;
		setNextCoord(newCoords);
		clearCanvas(canvas);
		if (ctx) drawShapes(ctx, newCoords);
	};

	const onMoveHandler = (e: IMouseEvent) => {
		const nextCoord = getNextCoordinate(e);
		const lastCoordObj = coords[coords.length - 1];
		const {canvas, ctx} = getCanvasAndContext();
		if (!canvas || !ctx || !lastCoordObj) return;
		const lastCoord = lastCoordObj.coord;
		clearCanvas(canvas);
		drawCursorLine(ctx, lastCoord, nextCoord);
		drawShapes(ctx, coords);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.bottomWrapper}>
				<ColorPicker
					title='measurement'
					activeId={activeId}
					data={pickerData}
					onClick={onHandlePickerClick}
				/>
				<div className={styles.outputWrapper}>
					<canvas
						className={styles.canvas}
						width={3348}
						height={1705}
						ref={canvasRef}
						onMouseDown={mouseDownHandler}
						onMouseMove={onMoveHandler}
					/>
					<img
						className={styles.img}
						alt=''
						width={3348}
						height={1705}
						src='https://www.mdpi.com/materials/materials-13-03802/article_deploy/html/images/materials-13-03802-g007.png'
					/>
				</div>
			</div>
		</div>
	);
};

export default Measurement;
