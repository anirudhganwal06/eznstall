import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import styles from './Write.module.css';

const MarkdownWrite = (props) => {
	const stepsJSX = [];
	for (let i in props.tutorial.steps) {
		stepsJSX.push(
			<React.Fragment key={i}>
				<div className={styles['add-remove-step-container']}>
					<div className={styles['add-step']} onClick={() => props.addStep(i)}>
            Add
					</div>
					<div
						className={styles['remove-step']}
						onClick={() => props.removeStep(i)}
					>
            Remove
					</div>
				</div>
				<TextareaAutosize
					className="w-100"
					placeholder={'Step ' + (+i + 1)}
					name="step"
					onChange={(e) => props.onChange(e, i)}
					value={props.tutorial.steps[i]}
				/>
			</React.Fragment>
		);
	}

	return (
		<React.Fragment>
			<b>Introduction</b>
			<TextareaAutosize
				key="introduction"
				className="w-100"
				placeholder="Introduction"
				name="introduction"
				onChange={props.onChange}
			/>
			<b>Steps</b>
			{stepsJSX}
			<div className={styles['add-remove-step-container']}>
				<div
					className={`${styles['add-step']} ${styles['add-step-last']}`}
					onClick={() => props.addStep(props.tutorial.steps.length)}
				>
          Add
				</div>
			</div>
			<b>Conclusion</b>
			<TextareaAutosize
				key="conclusion"
				className="w-100"
				placeholder="Conclusion"
				name="conclusion"
				onChange={props.onChange}
			/>
		</React.Fragment>
	);
};

export default MarkdownWrite;
