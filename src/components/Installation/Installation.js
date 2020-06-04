import React, { useState } from 'react';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import TutorialRenderer from './TutorialRenderer';

const Installation = props => {
	const [version, ] = useState(0);

	const installationId = props.match.params.installationId;
	
	useFirestoreConnect([
		{
			collection: 'installations',
			doc: installationId,
		},
		{
			collection: 'installations',
			doc: installationId,
			subcollections: [{ collection: 'tutorials' }],
			storeAs: 'tutorials'
		}
	]);

	let installation;
	let tutorial;
	const installations = useSelector(state => state.firestore.data.installations);
	const tutorials = useSelector(state => state.firestore.ordered.tutorials);
	if (installations) {
		installation = installations[installationId];
	}
	if (tutorials) {
		tutorial = tutorials[version];
	}

	return (
		<React.Fragment>
			<div className="heading-sec">
				<h1 className="text-center page-heading">{installation && installation.name}</h1>
			</div>
			<TutorialRenderer tutorial={tutorial} installation={installation} />
		</React.Fragment>
	);
};

export default Installation;
