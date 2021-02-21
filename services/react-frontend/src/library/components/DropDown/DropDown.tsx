import {useEffect, useRef} from 'react';
import cn from 'classnames';

import DropDownList from './Frames/DropDownList';

import useObjectState from 'library/common/hooks/useObjectState';
import useOutsideClick from 'library/common/hooks/useOutsideClick';

import confirmSVG from 'resources/icons/confirm.svg';
import downArrowSVG from 'resources/icons/down-arrow.svg';

import styles from './dropDown.module.scss';

interface IDropDown {
	options: any[];
	onSelect?: (v: any) => void;
	lockedIndex?: number;
	isCompleted?: boolean;
	placeholder?: string;
}

const DropDown = ({
	options,
	lockedIndex,
	isCompleted,
	onSelect,
	placeholder,
}: IDropDown) => {

	const [state, setState] = useObjectState({
		activeOption: placeholder ? placeholder : 'select...',
		isOptionsShown: false,
	})

	useEffect(() => setState({activeOption: placeholder}), [placeholder]);

	const wrapperRef = useRef(null);
	useOutsideClick(wrapperRef, () => setState({isOptionsShown: false}));

	const onHandleSelectOption = (option: any) => {
		setState({activeOption: option.label, isOptionsShown: false});
		if (onSelect) onSelect(option.value)
	};

	const toggleShowOptions = () => setState({isOptionsShown: !state.isOptionsShown});

	return (
		<div ref={wrapperRef} className={styles.wrapper}>
			<div onClick={toggleShowOptions} className={cn(styles.active, {[styles.completed]: isCompleted})}>
				{ isCompleted !== undefined && <img className={styles.status} alt='' src={confirmSVG} /> }
				<span className={styles.selected}>{state.activeOption}</span>
				<img className={styles.arrowDown} alt='' src={downArrowSVG} />
			</div>
			{
				state.isOptionsShown && (
					<DropDownList
						options={options}
						lockedIndex={isCompleted ? undefined : lockedIndex}
						onSelect={onHandleSelectOption}
					/>
				)
			}
		</div>
	)
}

export default DropDown;