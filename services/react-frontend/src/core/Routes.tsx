/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import ReactNotification from 'react-notifications-component';

import Header from 'library/components/Header';
import BreadcrumbsContainer from 'library/components/Breadcrumbs/BreadcrumbsContainer';
import SubHeader from 'library/components/SubHeader';

import ProjectsContainer from 'pages/Projects/ProjectsContainer';
import ProjectContainer from 'pages/Project/ProjectContainer';
import MeasurementContainer from 'pages/Measurement/MeasurementContainer';
import Button from 'library/components/Buttons/Button';

import MeasurementSVG from 'resources/icons/measurement.svg';

interface IRoutes {
	isUser: null | object;
	requestUser: () => void;
	createMeasurement: () => void;
}

const Routes: React.FC<IRoutes> = ({
	isUser,
	requestUser,
	createMeasurement,
}: IRoutes) => {

	useEffect(() => {
		if (!isUser) requestUser();
	}, []);

	const {pathname} = useLocation();
	const isPagePath = pathname.split('/').filter(sub => sub !== '').length === 2;

	if (!isUser) return <div>loading user...</div>;

	return (
		<>
			<ReactNotification />
			<Header />
			<SubHeader bottomBorder>
				<BreadcrumbsContainer />
				{
					isPagePath && (
						<Button
							text='Create Measurement'
							icon={MeasurementSVG}
							onClick={createMeasurement}
						/>
					)
				}
			</SubHeader>
			<Switch>
				<Redirect exact from='/' to='projects' />
				<Route exact path='/projects' component={ProjectsContainer} />
				<Route exact path='/projects/:projectId' component={ProjectContainer} />
				<Route exact path='/projects/:projectId/:measurementId' component={MeasurementContainer} />
				<Redirect to='/projects' />
			</Switch>
		</>
	);
};

export default Routes;
