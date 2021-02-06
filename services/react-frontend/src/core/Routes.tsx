import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import Header from 'library/components/Header';

import Projects from 'pages/Projects';
import Project from 'pages/Project';
import Measurement from 'pages/Measurement';

import Breadcrumbs from 'library/components/Breadcrumbs';
import SubHeader from 'library/components/SubHeader';
import Note from 'library/components/Note';

import LockSVG from 'resources/icons/lock.svg';

const Routes = () => (
	<>
		<Header />
		<SubHeader bottomBorder>
			<Breadcrumbs />
			<Note
				text='Ongoing measurement detected'
				icon={LockSVG}
				onClick={() => 'click'}
			/>
		</SubHeader>
		<Switch>
			<Redirect exact from='/' to='projects' />
			<Route exact path='/projects' component={Projects} />
			<Route exact path='/projects/:projectId' component={Project} />
			<Route exact path='/projects/:projectId/:measurementId' component={Measurement} />
			<Redirect to='/projects' />
		</Switch>
	</>
);

export default Routes;
