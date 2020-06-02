import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './Write.module.css';

const MarkdownRenderer = (props) => {
	const tutorialStepsJSX = [];
	for (let i in props.tutorial.steps) {
		tutorialStepsJSX.push(
			<div key={i} className={`row no-gutters ${styles['sub-section']}`}>
				<div className="col-6">
					<ReactMarkdown source={props.tutorial.steps[i].markdown}></ReactMarkdown>
				</div>
				<div className="col-6">
					<img className="w-100" src="assets/images/dummySS.png" alt="Dummy" />
				</div>
			</div>
		);
	}

	return (
		<React.Fragment>
			<b>Preview</b>
			<div className={styles['markdown-renderer']}>
				{props.tutorial.introduction.trim() === '' ? (
					''
				) : (
					<div className={styles['sub-section']}>
						<ReactMarkdown source={props.tutorial.introduction}></ReactMarkdown>
					</div>
				)}
				{tutorialStepsJSX}
				{props.tutorial.conclusion.trim() === '' ? (
					''
				) : (
					<div className={styles['sub-section']}>
						<ReactMarkdown source={props.tutorial.conclusion}></ReactMarkdown>
					</div>
				)}
			</div>
		</React.Fragment>
	);
};

export default MarkdownRenderer;
