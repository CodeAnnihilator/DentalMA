import ModalControls from '../ModalControls';

import styles from './modalContent.module.scss';

interface IModalContent {
	onClose: () => void;
	onConfirm: () => void;
	headerMessage?: string;
	bodyMessage?: string;
	bodyComponent?: any;
}

const ModalContent = ({
	headerMessage,
	bodyMessage,
	bodyComponent,
	...props
}: IModalContent) => (
	<div className={styles.wrapper}>
		<div className={styles.innerWrapper}>
			{ headerMessage && <div className={styles.header}>{headerMessage}</div> }
			{ bodyMessage && <div className={styles.message}>{bodyMessage}</div> }
			{ bodyComponent && bodyComponent() }
			<ModalControls {...props} />
		</div>
	</div>
)

export default ModalContent;