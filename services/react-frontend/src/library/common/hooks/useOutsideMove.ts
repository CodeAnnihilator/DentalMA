/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';

const useOutsideMove = (ref: any, data: any, isActive: boolean, cb: () => void) => {
	const handleMoveOutside = (e: any) => (!isActive && ref.current && !ref.current.contains(e.target)) && cb();
	useEffect(() => {
		document.addEventListener('mousemove', handleMoveOutside);
		return () => document.removeEventListener('mousemove', handleMoveOutside);
	}, [ref, data]);
}

export default useOutsideMove;