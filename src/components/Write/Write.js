import React, { useReducer } from 'react';

import './Write.module.css';
import MarkdownWrite from './MarkdownWrite';
import MarkdownRenderer from './MarkdownRenderer';

const Write = () => {

	const reducer = (state, action) => {
		const newSteps = [...state.steps];
		if (action.type === 'ADD_STEP' || action.type === 'REMOVE_STEP' || action.type === 'CHANGE_STEP') {
			switch(action.type) {
			case 'ADD_STEP': 
				newSteps.splice(action.i, 0, '');
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
		introduction: '',
		steps: [{
			markdown: '',
			image: ''
		}],
		conclusion: ''
	};

	const [tutorial, dispatch] = useReducer(reducer, initialState);

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
						<button className="btn btn-block btn-primary">Publish</button>
					</div>
				</div>
			</section>
		</React.Fragment>
	);
};

export default Write;
