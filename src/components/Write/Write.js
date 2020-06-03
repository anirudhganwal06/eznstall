import React, { useReducer, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFirebase, useFirestore } from 'react-redux-firebase';

import './Write.module.css';
import MarkdownWrite from './MarkdownWrite';
import MarkdownRenderer from './MarkdownRenderer';
import getImageStoragePath from '../../utils/getImageStoragePath';
import toKebabCase from '../../utils/toKebabCase';

const Write = () => {

	// Defining reducer for local state manipulation
	const reducer = (state, action) => {
		const newSteps = [...state.steps];
		if (action.type === 'ADD_STEP' || action.type === 'REMOVE_STEP' || action.type === 'CHANGE_STEP' || action.type === 'ADD_IMAGE') {
			switch(action.type) {
			case 'ADD_STEP': 
				newSteps.splice(action.i, 0, { markdown: '', image: {} });
				break;
			case 'REMOVE_STEP': 
				newSteps.splice(action.i, 1);
				break;
			case 'CHANGE_STEP': 
				newSteps[action.i][action.dataType] = action.value;
				break;
			default:
				return { ...state };
			}
			return {
				...state,
				steps: newSteps
			};
		} else {
			switch(action.type) {
			case 'HANDLE_CHANGE':
				return {
					...state,
					[action.name]: action.value
				};
			default:
				return { ...state };
			}
		}
	
	};

	// Initial local state
	const initialState = {
		name: '',
		description: '',
		version: '',
		introduction: '',
		steps: [{
			markdown: '',
			image: ''
		}],
		conclusion: ''
	};

	// Using hooks
	const [installation, dispatch] = useReducer(reducer, initialState);
	const [loading, setLoading] = useState(false);

	const firebase = useFirebase();
	const firestore = useFirestore();
	const auth = useSelector(state => state.firebase.auth);

	const uploadImage = async(image, stepNumber) => {
		const storageRef = firebase.storage().ref();
		const imageRef = storageRef.child(getImageStoragePath(installation, image, stepNumber));
		await imageRef.put(image);
	};

	// Publish the tutorial
	const publish = async() => {
		setLoading(true);

		// Uploading images of all steps
		await Promise.all(installation.steps.map((step, index) => {
			return uploadImage(step.image, index);
		}));

		// Uploading document in Cloud Firestore
		const installationRef = firestore.collection('installations').doc(toKebabCase(installation.name, true));
		await installationRef.set({
			name: installation.name,
			description: installation.description,
			installationVersions: firestore.FieldValue.arrayUnion(installation.version)
		});
		const tutorialRef = installationRef.collection('tutorials').doc(installation.version);
		await tutorialRef.set({
			introduction: installation.introduction,
			steps: installation.steps.map(step => step.markdown),
			conclusion: installation.conclusion,
			writer: {
				name: auth.displayName,
				uid: auth.uid
			}
		});

		setLoading(false);
	};

	// For manipulating the publish button 
	useEffect(() => {
		if (loading) {
			document.getElementById('publish-btn').textContent = 'Publishing ...';
		} else {
			document.getElementById('publish-btn').textContent = 'Publish';
		}
	}, [loading]);

	return (
		<React.Fragment>
			<section className="heading-sec">
				<h1 className="text-center page-heading">Write</h1>
			</section>
			<section className="container-fluid">
				<div className="row">
					<div className="col-8">
						<MarkdownWrite
							tutorial={installation}
							dispatch={dispatch}
						/>
						<p className="text-muted">Everything you write above will be rendered as Markdown</p>
					</div>
					<div className="col-4">
						<MarkdownRenderer tutorial={installation} />
					</div>
					<div className="col-12 my-2">
						<button id="publish-btn" className="btn btn-block btn-primary" onClick={publish}>Publish</button>
					</div>
				</div>
			</section>
		</React.Fragment>
	);
};

export default Write;
