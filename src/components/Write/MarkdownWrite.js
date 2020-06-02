import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import ImageUploader from 'react-images-upload';

import styles from './Write.module.css';

const MarkdownWrite = (props) => {
	const stepsJSX = [];
	for (let i in props.tutorial.steps) {
		stepsJSX.push(
			<React.Fragment key={i}>
				<div className={styles['add-remove-step-container']}>
					<div className={styles['add-step']} onClick={() => props.dispatch({ type: 'ADD_STEP', i: +i })}>
            Add
					</div>
					<div
						className={styles['remove-step']}
						onClick={() => props.dispatch({ type: 'REMOVE_STEP', i })}
					>
            Remove
					</div>
				</div>
				<div className="row">
					<div className="col-9">
						<TextareaAutosize
							className="w-100"
							placeholder={'Step ' + (+i + 1)}
							name="step"
							data-type="markdown"
							onChange={(e) => props.dispatch({ type: 'CHANGE_STEP', dataType: 'markdown', value: e.target.value, i })}
							value={props.tutorial.steps[i].markdown}
						/>
					</div>
					<div className="col-3">
						<ImageUploader
							name="step"
							data-type="image"
							withIcon={true}
							buttonText='Choose screenshot'
							onChange={(e) => props.onChange(e, i)}
							imgExtension={['.jpg', '.gif', '.png', '.gif']}
							maxFileSize={5242880}
						/>
					</div>
				</div>
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
				onChange={e => props.dispatch({ type: 'HANDLE_CHANGE', name: 'introduction', value: e.target.value })}
			/>
			<b>Steps</b>
			{stepsJSX}
			<div className={styles['add-remove-step-container']}>
				<div
					className={`${styles['add-step']} ${styles['add-step-last']}`}
					onClick={() => props.dispatch({ type: 'ADD_STEP', i: props.tutorial.steps.length })}
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
				onChange={e => props.dispatch({ type: 'HANDLE_CHANGE', name: 'conclusion', value: e.target.value })}
			/>
		</React.Fragment>
	);
};

export default MarkdownWrite;
