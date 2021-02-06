export default (stream: MediaStream) =>
	stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
