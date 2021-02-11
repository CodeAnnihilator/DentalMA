/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import ModalContent from 'library/components/Modal/Frames/ModalContent';

const modalRoot = document.getElementById('modal');

interface IModal {
	onClose: () => void;
	onConfirm: () => void;
	headerMessage: string;
	bodyMessage: string;
}

const Modal = (props: IModal) => {

	const [div] = useState(document.createElement('div'));

	useEffect(() => {
		modalRoot?.appendChild(div);
	}, [])

	useEffect(() => {
		return () => {
			modalRoot?.removeChild(div);
		}
	}, [])

	return (
		createPortal(<ModalContent {...props} />, div)
	)
}

export default Modal;