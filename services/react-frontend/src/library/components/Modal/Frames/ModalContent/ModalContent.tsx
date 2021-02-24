import ModalControls from '../ModalControls';

import styles from './modalContent.module.scss';

interface IModalContent {
	onClose?: () => void;
	onConfirm?: () => void;
	headerMessage?: string;
	bodyMessage?: string;
	bodyComponent?: any;
	style?: any;
}

const ModalContent = ({
	headerMessage,
	bodyMessage,
	bodyComponent,
	style,
	...props
}: IModalContent) => (
	<div className={styles.wrapper}>
		<div className={styles.innerWrapper} style={style}>
			{ headerMessage && <div className={styles.header}>{headerMessage}</div> }
			{ bodyMessage && <div className={styles.message}>{bodyMessage}</div> }
			{ bodyComponent && bodyComponent() }
			{ props.onConfirm && <ModalControls {...props} /> }
		</div>
	</div>
)

export default ModalContent;