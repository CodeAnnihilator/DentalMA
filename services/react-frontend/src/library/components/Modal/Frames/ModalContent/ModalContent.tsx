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
}: IModalContent) => (
	<div onClick={onClose} className={styles.wrapper}>
		<div className={styles.innerWrapper}>
			<div className={styles.header}>{headerMessage}</div>
			<div className={styles.message}>{bodyMessage}</div>
			<div className={styles.controls}>
				<div onClick={onClose}>cancel</div>
				<div onClick={onConfirm}>confirm</div>
			</div>
		</div>
	</div>
)

export default ModalContent;