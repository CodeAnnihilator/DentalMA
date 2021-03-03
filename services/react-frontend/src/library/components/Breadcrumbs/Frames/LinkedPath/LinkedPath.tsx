import {useHistory, useLocation} from 'react-router-dom';
import cn from 'classnames';

import folderSVG from 'resources/icons/folder.svg';
import fileSVG from 'resources/icons/file.svg';
import rightArrowSVG from 'resources/icons/right-arrow.svg';

import styles from './linkedPath.module.scss';

const pushTo = (index: number, arr: string[]) => (`/${arr.slice(0, index + 1).join('/')}`);

interface ILinkedPath {
	projectName: string;
	measurementName: string;
}

const LinkedPath = ({
	projectName,
	measurementName,
}: ILinkedPath) => {

	const history = useHistory();
	const {pathname} = useLocation();
	const splittedRoutePath = pathname.split('/').filter(sub => sub !== '');

	const setBreadcrumbLabel = (sub: string, index: number) => {
		if (index === 1) return projectName;
		if (index === 2) return 'measurement: ' + (measurementName ? measurementName : `(no name) #${sub}`);
	
		return sub;
	};

	return (
		<>
			{
				splittedRoutePath.map((sub, index, arr) => (
					<div
						key={index}
						className={cn(styles.navEl, {[styles.current]: !arr[index + 1]})}
						onClick={() => history.push(pushTo(index, arr))}
					>
						{ !!index && <img alt='' className={styles.arrowRight} src={rightArrowSVG} /> }
						<div className={styles.el}>
							<img alt='' className={styles.img} src={index === 2 ? fileSVG : folderSVG} />
							<span className={cn({[styles.notLast]: arr[index + 1]})}>{setBreadcrumbLabel(sub, index)}</span>
						</div>
					</div>
				))
			}
		</>
	);
};

export default LinkedPath;
