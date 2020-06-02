import React, { useReducer, useEffect, useState } from 'react';

import './Write.module.css';
import MarkdownWrite from './MarkdownWrite';
import MarkdownRenderer from './MarkdownRenderer';
import { useFirebase } from 'react-redux-firebase';

const Write = () => {
	const reducer = (state, action) => {
		console.log(action);
		const newSteps = [...state.steps];
		if (action.type === 'ADD_STEP' || action.type === 'REMOVE_STEP' || action.type === 'CHANGE_STEP' || action.type === 'ADD_IMAGE') {
			switch(action.type) {
			case 'ADD_STEP': 
				newSteps.splice(action.i, 0, {});
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

	const initialState = {
		name: '',
		version: '',
		introduction: '',
		steps: [{
			markdown: '',
			image: ''
		}],
		conclusion: ''
	};

	const [tutorial, dispatch] = useReducer(reducer, initialState);
	const [loading, setLoading] = useState(false);

	const firebase = useFirebase();
	// const firestore = useFirestore();

	// Util functions
	const normalToKebabCase = (normal, toLowerCase) => {
		if (toLowerCase) {
			return normal.trim().toLowerCase().replace(/\s+/g,'-');
		}
		return normal.trim().replace(/\s+/g,'-');
	};

	const getFileExtension = file => {
		return file.name.split('.').pop();
	};

	const getStoragePath = image => {
		return 'images/' + normalToKebabCase(tutorial.name, true) + '__' + normalToKebabCase(tutorial.version, false) + '__0.' + getFileExtension(image);
	};

	const publish = async() => {
		setLoading(true);
		const storageRef = firebase.storage().ref();
		const image = tutorial.steps[0].image;
		const imageRef = storageRef.child(getStoragePath(image));
		const snapshot = await imageRef.put(image);
		console.log(snapshot);
		setLoading(false);
	};

	useEffect(() => {
		if (loading) {
			document.getElementById('publish-btn').textContent = 'Publishing ...';
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
							tutorial={tutorial}
							dispatch={dispatch}
						/>
						<p className="text-muted">Everything you write above will be rendered as Markdown</p>
					</div>
					<div className="col-4">
						<MarkdownRenderer tutorial={tutorial} />
					</div>
					<div className="col-12 my-2">
						<button className="btn btn-block btn-success">Save as Draft</button>
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
