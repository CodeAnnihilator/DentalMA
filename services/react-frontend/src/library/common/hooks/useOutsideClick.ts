/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';

const useOutsideClick = (ref: any, cb: () => void) => {
	useEffect(() => {
		const handleClickOutside = (e: any) => (ref.current && !ref.current.contains(e.target)) && cb();
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [ref]);
}

export default useOutsideClick;