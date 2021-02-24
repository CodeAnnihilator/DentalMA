/* eslint-disable no-sequences */
import cn from 'classnames';

import styles from './contextMenu.module.scss';

interface IContextMenuEl {
	color: string;
	text: string;
	onClick: () => void;
}

interface IContextMenu {
	data: IContextMenuEl[];
	coord: number[];
	onClose: () => void;
}

const ContextMenu = ({
	data,
	coord,
	onClose,
}: IContextMenu) => (
	<div className={styles.wrapper} style={{left: coord[0], top: coord[1]}}>
		{
			data.map((o, i) => (
				<div
					key={i}
					onClick={() => (o.onClick(), onClose())}
					className={cn(styles.row, {[styles.devider]: !!data[i + 1]})}
				>
					<div className={styles.dot} style={{backgroundColor: o.color}} />
					<div>{o.text}</div>
				</div>
			))
		}
	</div>
);

export default ContextMenu;
