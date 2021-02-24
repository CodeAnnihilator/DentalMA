import {BaseSyntheticEvent} from 'react';
import {ICoord} from 'pages/Measurement/Frames/Analysis/Analysis';

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
		}
	}
};

export const lenpoint = (coordA: number[], coordB: number[], devX=1, devY=1) => {
	const a = coordA[0] - coordB[0];
	const b = coordA[1] - coordB[1];

	return Math.hypot(a * devX, b * devY);
};

export const getClickedNode = (coords: ICoord[], nextCoord: ICoord) => {
	if (!coords.length) return;
	const nodesWithDistances = coords.map((c, i) => {
		const distance = lenpoint(c.coord, nextCoord.coord);
		return {...c, distance, i};
	})
	const closestNode = nodesWithDistances.reduce((c, n) => c.distance < n.distance ? c : n);
	if (closestNode.distance <= 5) return closestNode;
	return null;
}