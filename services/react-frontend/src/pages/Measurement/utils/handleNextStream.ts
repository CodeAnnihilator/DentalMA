import stopTracks from 'library/utilities/stopTracks';

const handleNextStream = (cameraId: string, ref: any, stream: any, cb: (stream: any) => void) => {
	(async () => {
		if (!ref.current) return;
		ref.current.srcObject = null;
		if (!cameraId) {
			if (stream) stopTracks(stream);
			return;
		}
		try {
			if (stream) stopTracks(stream);
			const nextStream = await navigator.mediaDevices.getUserMedia({video: {deviceId: cameraId}});
			ref.current.srcObject = nextStream;
			cb(nextStream);
		} catch (err) {
			console.log(err);
		}
	})();
};

export default handleNextStream;