import cn from 'classnames';

import styles from './imgButton.module.scss';

interface IImgButton {
	img: string;
	direction?: string;
	isActive?: boolean;
	onClick?: (e: any) => void;
}

const ImgButton = ({
	img,
	direction,
	isActive,
	onClick,
}: IImgButton) => (
	<img
		alt=''
		onClick={isActive ? undefined : onClick}
		className={cn(styles.wrapper, {[styles.active]: isActive})}
		style={{transform: direction === 'reverse' ? 'scaleX(-1)' : 'none'}}
		src={img}
	/>
);

export default ImgButton;
