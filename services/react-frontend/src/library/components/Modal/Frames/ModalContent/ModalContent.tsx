import styles from './modalContent.module.scss';

interface IModalContent {
	onClose: () => void;
	onConfirm: () => void;
	headerMessage: string;
	bodyMessage: string;
}

const ModalContent = ({
	onClose,
	onConfirm,
	headerMessage,
	bodyMessage,
}: IModalContent) => {
	return (
		<div onClick={onClose} className={styles.wrapper}>
			<div className={styles.innerWrapper} onClick={onClose}>asdasd</div>
		</div>
	)
}

export default ModalContent;