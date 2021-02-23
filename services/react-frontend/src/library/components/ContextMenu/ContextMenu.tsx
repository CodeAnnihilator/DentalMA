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
}

const ContextMenu = ({
	data,
	coord,
}: IContextMenu) => (
	<div className={styles.wrapper} style={{left: coord[0], top: coord[1]}}>
		{
			data.map((o, i) => (
				<div
					key={i}
					onClick={o.onClick}
					className={cn(styles.row, {[styles.devider]: !!data[i + 1]})}
				>
					<div className={styles.dot} style={{color: o.color}} />
					<div>{o.text}</div>
				</div>
			))
		}
	</div>
);

export default ContextMenu;
