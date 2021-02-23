import {useState, useRef, BaseSyntheticEvent} from 'react';

import useOutsideMove from 'library/common/hooks/useOutsideMove';
import { IMQSettings } from 'library/common/reducers/analysisReducer';

import {getCanvasAndContext, clearCanvas, getNextCoordinate, getClickedNode} from '../../utils/canvas';

import styles from './analysis.module.scss';

const getPickerColorById = (colorId: number, mqSettings: IMQSettings[]) => {
	const colorObj = mqSettings.find(({id}) => id === colorId);
	return colorObj?.color || mqSettings[0].color;
};

interface IMouseEvent extends BaseSyntheticEvent {
	clientX: number;
	clientY: number;
}

export interface ICoord {
	coord: number[];
	colorId: string;
}

interface IAnalysis {
	base64Img: string;
	activeControl: number;
	activeMQ: number;
	mqSettings: IMQSettings[];
	coords: ICoord[];
	updateCoordinates: (coords: ICoord[]) => void;
}

const Analysis = ({
	base64Img,
	mqSettings,
	activeMQ,
	activeControl,
	coords,
	updateCoordinates,
}: IAnalysis) => {

	const refPicture = useRef<HTMLImageElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useOutsideMove(canvasRef, coords, activeMQ === 1, () => {
		if (activeControl) {
			const {canvas, ctx} = getCanvasAndContext(canvasRef);
			if (!canvas || !ctx) return;
			clearCanvas(canvas);
			if (ctx) drawShapes(ctx, coords);
		}
	});

	const [dimensions, setDimensions] = useState({width: 0, height: 0});

	const handleImgLoad = () => {
		if (refPicture.current) {
			const {naturalWidth, naturalHeight} = refPicture.current;
			setDimensions({width: naturalWidth, height: naturalHeight});
		}
	};

	const drawShapes = (ctx: CanvasRenderingContext2D, drawCoords: ICoord[]) => {
		// draw lines
		drawCoords.forEach(({coord, colorId}, i: number) => {
			ctx.beginPath();
			if (i !== 0) ctx.moveTo(drawCoords[i - 1].coord[0], drawCoords[i - 1].coord[1]);
			ctx.lineTo(coord[0], coord[1]);
			ctx.strokeStyle = getPickerColorById(parseInt(colorId, 10), mqSettings);
			ctx.lineWidth = 2;
			ctx.stroke();
		});
		// draw circles
		drawCoords.forEach(({coord, colorId}) => {
			ctx.beginPath();
			ctx.moveTo(coord[0], coord[1]);
			ctx.arc(coord[0], coord[1], 5, 0, 2 * Math.PI);
			ctx.fillStyle = getPickerColorById(parseInt(colorId, 10), mqSettings);
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
		ctx.strokeStyle = getPickerColorById(activeMQ, mqSettings);
		ctx.stroke();
	};

	const mouseDownHandler = (e: IMouseEvent) => {
		const {canvas, ctx} = getCanvasAndContext(canvasRef);
		if (!canvas || !ctx) return;
		const nextCoord = getNextCoordinate(e, canvas);
		const nextCoordObject = {coord: nextCoord, colorId: activeMQ as any};
		const newCoords = coords.concat(nextCoordObject);
		if (activeControl) {
			updateCoordinates(newCoords);
			clearCanvas(canvas);
			if (ctx) drawShapes(ctx, newCoords);
			return;
		}
		const clickedNode = getClickedNode(coords, nextCoordObject);
		console.log(clickedNode);
	};

	const onMoveHandler = (e: IMouseEvent) => {
		const {canvas, ctx} = getCanvasAndContext(canvasRef);
		const lastCoordObj = coords[coords.length - 1];
		if (!canvas || !ctx || !lastCoordObj) return;
		if (activeControl) {
			const nextCoord = getNextCoordinate(e, canvas);
			const lastCoord = lastCoordObj.coord;
			clearCanvas(canvas);
			drawCursorLine(ctx, lastCoord, nextCoord);
			drawShapes(ctx, coords);
			return;
		}
	};

	if (!base64Img) return <div>loading...</div>

	return (
		<>
			{
				!!dimensions.height && (
					<canvas
						className={styles.canvas}
						width={dimensions.width}
						height={dimensions.height}
						ref={canvasRef}
						onMouseDown={mouseDownHandler}
						onMouseMove={onMoveHandler}
					/>
				)
			}
			<img
				className={styles.img}
				src={base64Img}
				ref={refPicture}
				onLoad={handleImgLoad}
				alt=''
			/>
		</>
	);
};

export default Analysis;
