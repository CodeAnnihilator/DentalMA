import React, {useRef, useEffect, useState} from 'react';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';

import stopTracks from 'library/utilities/stopTracks';

import SubHeader from 'library/components/SubHeader';

import styles from './output.module.scss';

const options = [
	{ value: '0' , label: `webcam: ${uuidv4()}` },
	{ value: '1', label: `rem: ${uuidv4()}` },
	{ value: '2', label: `rem: ${uuidv4()}` }
]

const selectStyles = {
	control: (styles: any) => ({
		...styles,
		border: '1px solid #e4e4e4',
		minWidth: 300,
		fontSize: '0.8em'
	}),
}

const Output = () => {

	const refCanvas = useRef<HTMLCanvasElement>(null);
	const refVideo = useRef<HTMLVideoElement>(null);

	const [cameras, setCameras] = useState([] as MediaDeviceInfo[]);
	const [activeCameraId, setActiveCamera] = useState('');
	const [stream, setNextStream] = useState(null as any);
	const [picture, takePicture] = useState(null as any);
	const [pictureName, setPictureName] = useState('');

	useEffect(() => {
		(async () => {
			await navigator.mediaDevices.getUserMedia({video: true}).then(stopTracks);
			const devices = await navigator.mediaDevices.enumerateDevices();
			const videoInputs = devices.filter(device => device.kind === 'videoinput');
			setCameras(videoInputs);
			handleNextStream();
		})();
	}, []);

	useEffect(() => {
		(async () => {
			handleNextStream();
		})();
	}, [activeCameraId]);

	const handleNextStream = () => {
		(async () => {
			if (!refVideo.current) return;
			refVideo.current.srcObject = null;
			if (!activeCameraId) {
				if (stream) stopTracks(stream);

				return;
			}
			try {
				if (stream) stopTracks(stream);
				const nextStream = await navigator.mediaDevices.getUserMedia({
					video: {
						deviceId: activeCameraId,
					},
				});
				refVideo.current.srcObject = nextStream;
				setNextStream(nextStream);
			} catch (err) {
				console.log(err);
			}
		})();
	};

	const handleTakePicture = () => {
		if (!stream || !refCanvas.current) return;
		const {width, height} = stream.getTracks()[0].getSettings();
		const canvas = refCanvas.current;
		const context = refCanvas.current.getContext('2d');
		if (width && height) {
			canvas.width = width;
			canvas.height = height;
			if (context) context.drawImage(refVideo.current as any, 0, 0, width, height);
			const data = canvas.toDataURL('image/png');
			takePicture(data);
		}
	};

	const handleClearPicture = () => {
		takePicture(null);
		setPictureName('');
	};

	return (
		<div className={styles.wrapper}>
			<SubHeader bottomBorder>
				<Select
					placeholder='Streaming device'
					options={options}
					styles={selectStyles}
				/>
			</SubHeader>
			<div className={styles.outputWrapper}>
				{/* <video ref={refVideo} autoPlay/> */}
				<img
					className={styles.img}
					alt=''
					width={3348}
					height={1705}
					src='https://www.mdpi.com/materials/materials-13-03802/article_deploy/html/images/materials-13-03802-g007.png'
				/>
				{/* <canvas style={{display: 'none'}} ref={refCanvas} />
				{picture && <img src={picture} alt='' />} */}
			</div>
		</div>
	);
};

export default Output;
