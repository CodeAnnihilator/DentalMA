import dayjs from 'dayjs';

const getIndexes = (data: string[], fields: string[]) => {
	const indexes = [] as number[];
	data.forEach((s, i) => fields.some(f => f === s) && indexes.push(i));
	return indexes;
}

const formatDatesInArray = (data: any[], fields: string[], format: string) => {
	const tHead = data.length ? Object.keys(data[0]) : [];
	const fieldsIdx = getIndexes(tHead, fields);
	const tData = data.map((o: object) => (
		Object.values(o)
			.map((v, i) => fieldsIdx.some(idx => idx === i)
				? dayjs(v).format(format)
				: v
			)
	));
	return tData;
}

export default formatDatesInArray;