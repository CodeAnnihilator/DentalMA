/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Header from 'library/components/Header';
import BreadcrumbsContainer from 'library/components/Breadcrumbs/BreadcrumbsContainer';
import SubHeader from 'library/components/SubHeader';

import ProjectsContainer from 'pages/Projects/ProjectsContainer';
import ProjectContainer from 'pages/Project/ProjectContainer';
import Measurement from 'pages/Measurement';

interface IRoutes {
	isUser: null | object;
	requestUser: () => void;
}

const Routes: React.FC<IRoutes> = ({
	isUser,
	requestUser,
}: IRoutes) => {

	useEffect(() => {
		if (!isUser) requestUser();
	}, []);

	if (!isUser) return <div>loading user...</div>;

	return (
		<>
			<Header />
			<SubHeader bottomBorder>
				<BreadcrumbsContainer />
			</SubHeader>
			<Switch>
				<Redirect exact from='/' to='projects' />
				<Route exact path='/projects' component={ProjectsContainer} />
				<Route exact path='/projects/:projectId' component={ProjectContainer} />
				<Route exact path='/projects/:projectId/:measurementId' component={Measurement} />
				<Redirect to='/projects' />
			</Switch>
		</>
	);
};

export default Routes;
