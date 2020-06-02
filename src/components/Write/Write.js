import React, { useReducer } from 'react';

import './Write.module.css';
import MarkdownWrite from './MarkdownWrite';
import MarkdownRenderer from './MarkdownRenderer';
import { useFirebase, useFirestore } from 'react-redux-firebase';

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

	const firebase = useFirebase();
	const firestore = useFirestore();

	const publish = async() => {
		const storageRef = firebase.storage().ref();
		const imagesRef = storageRef.child('images/');
		const image = tutorial.steps[0].image;
		console.log(image);
		const snapshot = await imagesRef.put(image);
		console.log(snapshot);
	};

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
						<button className="btn btn-block btn-primary" onClick={publish}>Publish</button>
					</div>
				</div>
			</section>
		</React.Fragment>
	);
};

export default Write;
