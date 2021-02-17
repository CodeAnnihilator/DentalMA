import {BaseSyntheticEvent} from 'react';
import {ocrFetch} from 'library/utilities/fetch';

interface IMouseEvent extends BaseSyntheticEvent {
	clientX: number;
	clientY: number;
}

export const getCanvasAndContext = (refCanvas: any) => {
	const canvas = refCanvas.current;
	const ctx = canvas?.getContext('2d');
	if (!ctx || !canvas) return {canvas: null, ctx: null};

	return {canvas, ctx};
};

export const clearCanvas = (canvas: HTMLCanvasElement) => {
	const ctx = canvas?.getContext('2d');
	if (!ctx || !canvas) return;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
};

export const getNextCoordinate = (e: IMouseEvent, canvas: any) => {
	if (!canvas) return [];
	const rect = canvas.getBoundingClientRect();
	const scaleX = canvas.width / rect.width;
	const scaleY = canvas.height / rect.height;
	const x = (e.clientX - rect.left) * scaleX;
	const y = (e.clientY - rect.top) * scaleY;

	return [x, y] as number[];
};

export const getOCRCropImage = async (imgRef: any, canvasImgRef: any, canvasCropRef: any, coords: any) => {
	if (!imgRef.current || !canvasImgRef.current) return;
	const imgWidth = imgRef.current.naturalWidth;
	const imgHeight = imgRef.current.naturalHeight;
	const canvasImg = canvasImgRef.current;
	const context = canvasImgRef.current.getContext('2d');
	if (!canvasCropRef.current) return;
	if (imgWidth && imgHeight) {
		canvasImg.width = imgWidth;
		canvasImg.height = imgHeight;
		if (context) {
			context.drawImage(imgRef.current as any, 0, 0, imgWidth, imgHeight);
			const canvasCrop = canvasCropRef.current;
			const contextCrop = canvasCropRef.current.getContext('2d');
			canvasCrop.width = coords[2] - coords[0];
			canvasCrop.height = coords[3] - coords[1];
			let imgData = context.getImageData(coords[0], coords[1], coords[2] - coords[0], coords[3] - coords[1]);
			if (contextCrop) contextCrop.putImageData(imgData, 0, 0);
			return canvasCrop.toDataURL('image/png');
			// var formData = new FormData();
			// formData.set('file', file);
			// const res = await ocrFetch.post('/detect-magnification', formData).catch(e => console.log(e));
			// console.log(res)
		}
	}
};