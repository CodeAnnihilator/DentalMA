const handleTakePicture = (refStream: any, refServiceCanvas: any, stream: any, cb: (data: any) => void) => {
	setTimeout(() => {
		if (!stream || !refServiceCanvas.current) return;
		const {width, height} = stream.getTracks()[0].getSettings();
		const canvas = refServiceCanvas.current;
		const context = refServiceCanvas.current.getContext('2d');
		if (width && height) {
			canvas.width = width;
			canvas.height = height;
			if (context) context.drawImage(refStream.current as any, 0, 0, width, height);
			const data = canvas.toDataURL('image/jpeg');
			cb(data);
		}
	}, 150);
};

export default handleTakePicture;