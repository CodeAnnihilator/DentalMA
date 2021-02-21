import cn from 'classnames';

import styles from './textInput.module.scss';

const TextInput = ({
	isCompleted,
	...props
}: any) => (
	<input
		{...props}
		className={cn(
			styles.textInput,
			{[styles.completed]: isCompleted}
		)}
	/>
);

export default TextInput;
