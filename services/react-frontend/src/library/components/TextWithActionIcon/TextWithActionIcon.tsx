/* eslint-disable no-sequences */
import React from 'react';

import useObjectState from 'library/common/hooks/useObjectState';

import ConfirmSVG from 'resources/icons/confirm.svg';
import CancelSVG from 'resources/icons/cancel.svg';
import DeleteIcon from 'resources/icons/delete.svg';
import ButtonSVG from 'resources/icons/button.svg';
import EditSVG from 'resources/icons/edit.svg';

import styles from './textWithActionIcon.module.scss';

interface ITextWithActionIcon {
	value?: string;
	isNew?: boolean;
	placeholder?: string;
	onRemove?: any;
	onConfirm: (value: string) => void;
}

const TextWithActionIcon = ({
	isNew = false,
	value = '',
	placeholder,
	onConfirm,
	onRemove,
}: ITextWithActionIcon) => {

	const initialState = {
		isEditing: false,
		value
	};

	const [state, setState] = useObjectState(initialState);

	const onHandleConfirm = () => {
		onConfirm(state.value);
		setState(initialState);
	}

	const onHandleRemove = () => {
		onRemove();
		setState(initialState);
	}
	
	return (
		<div className={styles.wrapper}>
			{
				state.isEditing && (
					<input
						className={styles.input}
						value={state.value}
						placeholder={placeholder}
						onChange={e => setState({value: e.target.value})}
					/>
				)
			}
			{
				!state.isEditing && (
					<img
						alt=''
						onClick={() => setState({isEditing: !state.isEditing})}
						src={!isNew ? EditSVG : ButtonSVG}
						className={styles.icon}
					/>
				)
			}
			{state.isEditing && <img alt='' onClick={onHandleConfirm} src={ConfirmSVG} className={styles.icon} />}
			{state.isEditing && <img alt='' onClick={() => setState(initialState)} src={CancelSVG} className={styles.icon} />}
			{state.isEditing && !isNew && <img alt='' onClick={onHandleRemove} src={DeleteIcon} className={styles.icon} />}
		</div>
	);
};

export default TextWithActionIcon;
