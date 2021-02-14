const routeRenderType = (p: string[]) => {
	const projectsPath = p.length === 1 && p[0] === 'projects';
	const projectPath = p.length === 2 && p[0] === 'projects';
	if (projectsPath) return 'newProject';
	if (projectPath) return 'currentProject';
	return 'projectMeasurement';
};

export default routeRenderType;