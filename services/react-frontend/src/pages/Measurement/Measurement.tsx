/* eslint-disable react-hooks/exhaustive-deps */
import {useRef, useEffect, useState, BaseSyntheticEvent} from 'react';

import SubHeader from 'library/components/SubHeader';
import stopTracks from 'library/utilities/stopTracks';

import Settings from './Frames/Settings/SettingsContainer';

import handleNextStream from './utils/handleNextStream';
import handleTakePicture from './utils/handleTakePicture';

import styles from './measurement.module.scss';

interface IMouseEvent extends BaseSyntheticEvent {
	clientX: number;
	clientY: number;
}

interface IMeasurement {
	activeStep: number;
	activeCameraId: string;
	saveCameras: (cameras: object[]) => void;
}

const Measurements = ({
	activeStep,
	saveCameras,
	activeCameraId
}: IMeasurement) => {

	const refStream = useRef<HTMLVideoElement>(null);
	const refServiceCanvas = useRef<HTMLCanvasElement>(null);
	const refMeasureCanvas = useRef<HTMLCanvasElement>(null);

	const [stream, setNextStream] = useState(null as any);
	const [picture, setPicture] = useState(null as any);
	const [coords, setNextCoord] = useState([] as any);

	useEffect(() => {
		(async () => {
			await navigator.mediaDevices.getUserMedia({video: true}).then(stopTracks);
			const devices = await navigator.mediaDevices.enumerateDevices();
			const videoInputs = devices.filter(device => device.kind === 'videoinput');
			saveCameras(videoInputs);
			handleSetNextStream();
		})();
	}, []);

	useEffect(() => handleSetNextStream(), [activeCameraId]);

	const handleSetNextStream = () => handleNextStream(activeCameraId, refStream, stream, setNextStream)
	const handleSetTakePicture = () => handleTakePicture(refStream, refServiceCanvas, stream, setPicture)

	const dimensions = stream ? stream.getTracks()[0].getSettings() : null;

	const getCanvasAndContext = () => {
		const canvas = refMeasureCanvas.current;
		const ctx = canvas?.getContext('2d');
		if (!ctx || !canvas) return {canvas: null, ctx: null};

		return {canvas, ctx};
	};

	const drawBoundingRect = (ctx: CanvasRenderingContext2D, nextCoord: any) => {
		const x1 = coords[0];
		const y1 = coords[1]
		const w = nextCoord[0] - coords[0];
		const h = nextCoord[1] - coords[1];
		ctx.strokeStyle = 'gold';
		ctx.strokeRect(x1, y1, w, h);
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

	const mouseDownHandler = (e: IMouseEvent) => {
		const nextCoord = getNextCoordinate(e);
		const newCoords = coords.concat(nextCoord);
		setNextCoord(newCoords);
	};


	const mouseMoveHandler = (e: IMouseEvent) => {
		const nextCoord = getNextCoordinate(e);
		const {canvas, ctx} = getCanvasAndContext();
		if (!canvas || !ctx) return;
		clearCanvas(canvas);
		drawBoundingRect(ctx, nextCoord)
	}

	return (
		<div className={styles.wrapper}>
			<SubHeader bottomBorder>
				{ activeStep === 0 && <Settings /> }
				{ activeStep === 1 && <div>measurement</div> }
			</SubHeader>
			<div className={styles.outputWrapper}>
				{ 
					dimensions && (
						<canvas
							ref={refMeasureCanvas}
							className={styles.video}
							style={{zIndex: 100}}
							width={dimensions.width}
							height={dimensions.height}
							onMouseDown={mouseDownHandler}
							onMouseMove={mouseMoveHandler}
						/>
					)
				}
				{picture && <img className={styles.video} src={picture} alt='' />}
				<canvas style={{display: 'none'}} ref={refServiceCanvas} />
				<video
					className={styles.video}
					style={{display: 'none'}}
					ref={refStream}
					onLoadedDataCapture={handleSetTakePicture}
					autoPlay
				/>
			</div>
		</div>
	);
};

export default Measurements;
