import React, {useEffect, useRef} from 'react';

import SubHeader from 'library/components/SubHeader';

import MeasurementPNG from 'resources/icons/measurement.png';
import SelectionSVG from 'resources/icons/selection.svg';
import DeleteSVG from 'resources/icons/delete.svg';

import {ocrFetch} from 'library/utilities/fetch';

import styles from './calibration.module.scss';

const Calibration = () => {

	const canvasImgRef = useRef<HTMLCanvasElement>(null);
	const canvasCropRef = useRef<HTMLCanvasElement>(null);
	const imgRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		setTimeout(() => {
			onImageClick();
		}, 100)
	}, [])

	const onImageClick = async () => {
		if (!imgRef.current || !canvasImgRef.current) return;
		const imgWidth = imgRef.current.naturalWidth;
		const imgHeight = imgRef.current.naturalHeight;
		const canvas = canvasImgRef.current;
		const context = canvasImgRef.current.getContext('2d');
		if (!canvasCropRef.current) return;
		if (imgWidth && imgHeight) {
			canvas.width = imgWidth;
			canvas.height = imgHeight;
			if (context) {
				context.drawImage(imgRef.current as any, 0, 0, imgWidth, imgHeight);
				const canvas1 = canvasCropRef.current;
				const context1 = canvasCropRef.current.getContext('2d');
				canvas1.width = 600;
				canvas1.height = 140;
				var imgData = context.getImageData(400, 100, 300, 140);
				if (context1) context1.putImageData(imgData, 0, 0);
				const file = canvas1.toDataURL('image/png');
				console.log(file)
				let formData = new FormData();
				formData.set('file', file);
				const res = await ocrFetch.post('/detect-magnification', formData, {
					headers: {
						'content-type': 'multipart/form-data',
						'Access-Control-Allow-Origin': '*'
					}
				})
				console.log(res);
			}
		}
	};

	return (
		<div className={styles.wrapper}>
			<SubHeader bottomBorder>
			<div className={styles.buttonWrapper}>
				<div style={{color: 'rgb(64 167 47)'}} className={styles.buttonText}>Magnification Boundaries</div>
				<div style={{border: '1px dashed #72da5f'}} className={styles.buttonImgWrapper}>
					<img className={styles.buttonImg} alt='' src={SelectionSVG} />
				</div>
			</div>
			<div className={styles.buttonWrapper}>
				<div className={styles.buttonText}>Calibration Line Boundaries</div>
				<div className={styles.buttonImgWrapper}>
					<img className={styles.buttonImg} alt='' src={DeleteSVG} />
				</div>
			</div>
			</SubHeader>
			<div className={styles.outputWrapper}>
				<canvas
					className={styles.canvas}
					// width={3348}
					// height={1705}
					ref={canvasCropRef}
					style={{zIndex: 5}}
				/>
				<canvas
					className={styles.canvas}
					width={3348}
					height={1705}
					ref={canvasImgRef}
				/>
				<img
					alt=''
					ref={imgRef}
					crossOrigin='anonymous'
					className={styles.img}
					width={3348}
					height={1705}
					src={MeasurementPNG}
				/>
			</div>
		</div>
	);
};

export default Calibration;
