import cn from 'classnames';

import useObjectState from 'library/common/hooks/useObjectState';
import { IMeta } from 'library/common/interfaces/settings';

import styles from './metaModalContent.module.scss';

interface IMetaModalContent {
	onChange: (o: object) => void;
	meta: IMeta;
}

const initialState = {
	groupId: '',
	toothId: '',
	time: '',
	substrate: '',
	location: '',
}

const MetaModalContent = ({
	onChange,
	meta,
}: IMetaModalContent) => {

	const [state, setState] = useObjectState(meta ? meta : initialState);
	
	const handleChange = (field: string) => (e: any) => {
		if (e.target.validity.valid) {
			setState({[field]: e.target.value});
			onChange({...state, [field]: e.target.value});
		}
	}
	
	return (
		<div className={styles.wrapper}>
			<input
				pattern='[0-9]*'
				className={cn(styles.input, {[styles.completed]: !!state.groupId})}
				onChange={handleChange('groupId')}
				value={state.groupId}
				placeholder='enter groupId...'
			/>
			<input
				pattern='[0-9]*'
				className={cn(styles.input, {[styles.completed]: !!state.toothId})}
				onChange={handleChange('toothId')}
				value={state.toothId}
				placeholder='enter toothId...'
			/>
			<input
				pattern='[0-9]*'
				className={cn(styles.input, {[styles.completed]: !!state.time})}
				onChange={handleChange('time')}
				value={state.time}
				placeholder='enter time...'
			/>
			<input
				pattern='[0-9]*'
				className={cn(styles.input, {[styles.completed]: !!state.substrate})}
				onChange={handleChange('substrate')}
				value={state.substrate}
				placeholder='enter substrate...'
			/>
			<input
				pattern='[0-9]*'
				className={cn(styles.input, {[styles.completed]: !!state.location})}
				onChange={handleChange('location')}
				value={state.location}
				placeholder='enter location...'
			/>
		</div>
	)
}

export default MetaModalContent;