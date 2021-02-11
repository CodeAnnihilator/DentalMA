
const compare = (a: string, b: string, field: string, fn: (s: string) => Date, mode: string) => {
	if (fn(a[field]) < fn(b[field])) return mode === 'DESC' ? 1 : -1;
	if (fn(a[field]) > fn(b[field])) return mode === 'DESC' ? -1 : 1;
	return 0;
}

const fn = ((s: string) => new Date(s));

const sortByDate = (data: any[], field: string, mode: string) => {
	return data.sort((a, b) => compare(a, b, field, fn, mode));
}

export default sortByDate;