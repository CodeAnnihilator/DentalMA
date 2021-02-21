import styles from './modalControls.module.scss';

interface IModalControls {
	onClose: () => void;
	onConfirm: () => void;
}

const ModalControls = ({
	onClose,
	onConfirm,
}: IModalControls) => (
	<div className={styles.controls}>
		<div onClick={onClose}>cancel</div>
		<div onClick={onConfirm}>confirm</div>
	</div>
)

export default ModalControls;