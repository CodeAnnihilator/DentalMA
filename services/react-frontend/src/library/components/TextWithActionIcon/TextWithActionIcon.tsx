import React, {useState} from 'react';

import ConfirmSVG from 'resources/icons/confirm.svg';
import CancelSVG from 'resources/icons/cancel.svg';
import DeleteIcon from 'resources/icons/delete.svg';
import ButtonSVG from 'resources/icons/button.svg';
import EditSVG from 'resources/icons/edit.svg';

import styles from './textWithActionIcon.module.scss';

interface ITextWithActionIcon {
	text?: string;
	isNew?: boolean;
	onConfirm?: (text: string) => string;
	onDelete?: () => void;
}

const TextWithActionIcon = ({
	text,
	isNew = false,
	onConfirm,
	onDelete,
}: ITextWithActionIcon) => {

	const [isEditing, setEditing] = useState(false);
	const [tempInputValue, setTempInputValue] = useState('');

	const onHandleConfirm = () => (setEditing(false), onConfirm && onConfirm(tempInputValue));
	const onHandleRemove = () => (setEditing(false), onDelete && onDelete());
	const onHandleCancel = () => (setEditing(false), setTempInputValue(''));

	return (
		<div className={styles.wrapper}>
			{
				!isEditing
					? text
					: (
						<input
							className={styles.input}
							value={tempInputValue}
							placeholder={isNew ? 'Enter new project name here...' : 'Enter new value here'}
							onChange={e => setTempInputValue(e.target.value)}
						/>
					)
			}
			{
				!isEditing && (
					<img
						alt=''
						onClick={() => setEditing(!isEditing)}
						src={!isNew ? EditSVG : ButtonSVG}
						className={styles.icon}
					/>
				)
			}
			{isEditing && <img alt='' onClick={onHandleConfirm} src={ConfirmSVG} className={styles.icon} />}
			{isEditing && <img alt='' onClick={onHandleCancel} src={CancelSVG} className={styles.icon} />}
			{isEditing && !isNew && <img alt='' onClick={onHandleRemove} src={DeleteIcon} className={styles.icon} />}
		</div>
	);
};

export default TextWithActionIcon;
