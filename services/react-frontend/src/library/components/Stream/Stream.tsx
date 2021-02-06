import React, {VideoHTMLAttributes, useEffect, useRef, useState} from 'react';

import stopTracks from 'library/utilities/stopTracks';

type PropsType = VideoHTMLAttributes<HTMLVideoElement> & {
	activeCameraId: string;
	onSetNextStream: (stream: any) => void;
	stream: any;
	ref: any;
};

export default function Video({
	activeCameraId,
	onSetNextStream,
	stream,
	ref,
	...props
}: PropsType) {

	useEffect(() => {

		(async () => {

			if (!ref.current) return;

			ref.current.srcObject = null;

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

				ref.current.srcObject = nextStream;

				onSetNextStream(nextStream);

			} catch (err) {
				console.log(err);
			}

		})();

	}, [activeCameraId]);

	return (
		<video ref={ref} {...props} />
	);
}
