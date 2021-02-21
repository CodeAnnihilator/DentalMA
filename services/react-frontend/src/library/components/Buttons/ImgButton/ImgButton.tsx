import styles from './imgButton.module.scss';

interface IImgButton {
	img: string;
	direction?: string;
}

const ImgButton = ({
	img,
	direction,
}: IImgButton) => (
	<img
		alt=''
		className={styles.wrapper}
		style={{transform: direction === 'reverse' ? 'scaleX(-1)' : 'none'}}
		src={img}
	/>
);

export default ImgButton;
