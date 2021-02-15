import cn from 'classnames';

import LockSVG from 'resources/icons/lock.svg';

import styles from './dropDownList.module.scss';

interface IDropDownList {
	options: any;
	onSelect: (option: string) => void;
	lockedIndex?: number;
}

const DropDownList = ({
	options,
	onSelect,
	lockedIndex,
}: IDropDownList) => {
	return (
		<div className={styles.listWrapper}>
			{
				options.map((option: any, i: number) => {
					const isLocked = lockedIndex === i;
					return (
						<div key={i} className={cn(styles.option, {[styles.locked]: isLocked})} onClick={() => isLocked ? null : onSelect(option)}>
							{option.label}
							{ isLocked && <img className={styles.lock} alt='' src={LockSVG} /> }
						</div>
					)
				})
			}
		</div>
	)
}



export default DropDownList;