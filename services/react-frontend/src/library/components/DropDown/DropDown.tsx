import {useEffect, useRef} from 'react';

import DropDownList from './Frames/DropDownList';

import useObjectState from 'library/common/hooks/useObjectState';
import useOutsideClick from 'library/common/hooks/useOutsideClick';

import confirmSVG from 'resources/icons/confirm.svg';
import downArrowSVG from 'resources/icons/down-arrow.svg';

import styles from './dropDown.module.scss';

interface IDropDown {
	options: any[];
	onSelect?: (cameraId: string) => void;
	lockedIndex?: number;
	isComplete?: boolean;
	placeholder?: string;
}

const DropDown = ({
	options,
	lockedIndex,
	isComplete,
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
			<div onClick={toggleShowOptions} className={styles.active}>
				{ isComplete !== undefined && <img className={styles.status} alt='' src={confirmSVG} /> }
				<span className={styles.selected}>{state.activeOption}</span>
				<img className={styles.arrowDown} alt='' src={downArrowSVG} />
			</div>
			{
				state.isOptionsShown && (
					<DropDownList
						options={options}
						lockedIndex={lockedIndex}
						onSelect={onHandleSelectOption}
					/>
				)
			}
		</div>
	)
}

export default DropDown;