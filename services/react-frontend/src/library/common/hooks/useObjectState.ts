import {useState} from 'react';

const useObjectState = (initialObject: any) => {

	const [state, setObj] = useState(initialObject);

	const setState = (x: any) => {
		typeof x === 'function'
			? setObj((obj: object) => ({...obj, ...x(obj)}))
			: setObj((obj: object) => ({...obj, ...x}))
		;
	};

	return [state, setState];
};

export default useObjectState;
