import {useRef, useEffect} from 'react';

function useEventListener(eventName: string, handler: any, element = window){

	const savedHandler = useRef();

	useEffect(() => {
		savedHandler.current = handler;
	}, [handler]);
  
	useEffect(
		() => {

			const isSupported = element && element.addEventListener;

			if (!isSupported) return;

			// TODO: fix ts rule later
			// @ts-ignore-start
			const eventListener = (event: any) => savedHandler.current(event);
			// @ts-ignore-end

			element.addEventListener(eventName, eventListener);

			return () => {
				element.removeEventListener(eventName, eventListener);
			};

		}, [eventName, element]);
  };

export default useEventListener;