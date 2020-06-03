import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './Write.module.css';

const MarkdownRenderer = (props) => {

	// Creating Tutorial Steps as Javascript XML
	const tutorialStepsJSX = [];
	for (let i in props.tutorial.steps) {
		let url = '';
		try {
			url = window.URL.createObjectURL(props.tutorial.steps[i].image);
		} catch(err) {
			// Do nothing
			// Error is expected when createObjectURL doesn't detect a file object 
			// It's OK
		}
		tutorialStepsJSX.push(
			<div key={i} className={`row no-gutters ${styles['sub-section']}`}>
				<div className="col-6">
					<ReactMarkdown source={props.tutorial.steps[i].markdown}></ReactMarkdown>
				</div>
				<div className="col-6">
					{ url !== '' ?
						<img className="w-100" src={url} alt="Dummy" />
						: 
						''
					}
				</div>
			</div>
		);
	}

	return (
		<React.Fragment>
			<b>Preview</b>
			<div className={styles['markdown-renderer']}>
				{props.tutorial.name.trim() === '' ? (
					''
				) : (
					<div className={styles['sub-section']}>
						<h1 className="text-center page-heading">{props.tutorial.name}</h1>
					</div>
				)}
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
