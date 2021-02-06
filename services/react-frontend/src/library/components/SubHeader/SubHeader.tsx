import React, {ReactNode} from 'react';
import cn from 'classnames';

import styles from './subHeader.module.scss';

interface ISubHeader {
	children?: ReactNode;
	bottomBorder?: boolean;
	bg?: string;
}

const SubHeader = ({
	children,
	bottomBorder = false,
	bg,
}: ISubHeader) => (
	<div className={cn(styles.wrapper, {[styles.border]: bottomBorder})} style={{backgroundColor: bg}}>
		{children}
	</div>
);

export default SubHeader;
