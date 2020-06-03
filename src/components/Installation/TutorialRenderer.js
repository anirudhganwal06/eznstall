import React from 'react';
import ReactMarkdown from 'react-markdown';
import { isLoaded } from 'react-redux-firebase';

const TutorialRenderer = props => {
	const tutorialStepsJSX = [];
	if (isLoaded(props.tutorial)) {
		for (let i in props.tutorial.steps) {
			tutorialStepsJSX.push(
				<div key={i} className='row no-gutters steps-sub-section'>
					<div className="col-6">
						<h1>{'Step ' + (+i + 1)}</h1>
						<ReactMarkdown source={props.tutorial.steps[i].markdown}></ReactMarkdown>
					</div>
					<div className="col-6">
						<img className="w-100" src={props.tutorial.steps[i].image} alt="Dummy" />
					</div>
				</div>
			);
		}
	}

	return (
		<React.Fragment>
			{props.tutorial && props.installation ?
				<React.Fragment>
					<div className="steps-sub-section">
						<ReactMarkdown source={props.tutorial.introduction}></ReactMarkdown>
					</div>
					{tutorialStepsJSX}
					<div className="steps-sub-section">
						<ReactMarkdown source={props.tutorial.conclusion}></ReactMarkdown>
					</div>
				</React.Fragment>
				:
				''
			}
		</React.Fragment>
	);
};

export default TutorialRenderer;