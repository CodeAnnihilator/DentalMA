import React from 'react';
import cn from 'classnames';
import {useHistory, useLocation} from 'react-router-dom';

import TextWithActionIcon from 'library/components/TextWithActionIcon';

import folderSVG from 'resources/icons/folder.svg';
import fileSVG from 'resources/icons/file.svg';
import rightArrowSVG from 'resources/icons/right-arrow.svg';

import styles from './breadcrumbs.module.scss';

const pushTo = (index: number, arr: string[]) => (`/${arr.slice(0, index + 1).join('/')}`);

const setLabel = (sub: string, index: number) => {
	if (index === 1) return `project #${sub}`;
	if (index === 2) return `measurement #${sub}`;

	return sub;
};

const Breadcrumbs = () => {

	const history = useHistory();

	const {pathname} = useLocation();

	const splittedPath = pathname.split('/').filter(sub => sub !== '');

	return (
		<div className={styles.wrapper}>
			{
				splittedPath.map((sub, index, arr) => (
					<div
						key={index}
						className={cn(styles.navEl, {[styles.current]: !arr[index + 1]})}
						onClick={() => history.push(pushTo(index, arr))}
					>
						{ !!index && <img alt='' className={styles.arrowRight} src={rightArrowSVG} /> }
						<div className={styles.el}>
							<img alt='' className={styles.img} src={index === 2 ? fileSVG : folderSVG} />
							<span className={cn({[styles.notLast]: arr[index + 1]})}>{setLabel(sub, index)}</span>
							{ !arr[index + 1] && <TextWithActionIcon isNew={!index} />}
						</div>
					</div>
				))
			}
		</div>
	);
};

export default Breadcrumbs;
