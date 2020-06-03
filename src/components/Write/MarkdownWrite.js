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
						onClick={() => props.dispatch({ type: 'REMOVE_STEP', i: +i })}
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
							onChange={(e) => props.dispatch({ type: 'CHANGE_STEP', dataType: 'markdown', value: e.target.value, i: +i })}
							value={props.tutorial.steps[i].markdown}
						/>
					</div>
					<div className="col-3">
						<ImageUploader
							name="step"
							data-type="image"
							withIcon={true}
							buttonText='Choose screenshot'
							onChange={images => props.dispatch({ type: 'CHANGE_STEP', dataType: 'image', value: images[0], i: +i })}
							imgExtension={['.jpg', '.jpeg', '.png']}
							maxFileSize={5242880}
							singleImage={true}
							label="Screenshot for this step"
						/>
					</div>
				</div>
			</React.Fragment>
		);
	}

	return (
		<React.Fragment>
			<b>Name of the software</b>
			<input
				className="w-100"
				placeholder="Name of the software"
				name="name"
				onChange={e => props.dispatch({ type: 'HANDLE_CHANGE', name: 'name', value: e.target.value })}
				value={props.tutorial.name}
			/>
			<b>Short description of the software</b>
			<input
				className="w-100 mb-0"
				placeholder="Write something about the software"
				name="description"
				onChange={e => props.dispatch({ type: 'HANDLE_CHANGE', name: 'description', value: e.target.value })}
				value={props.tutorial.description}
			/>
			<p className="text-muted">It should be about 1 - 2 lines.</p>
			<b>Version of the software</b>
			<input
				className="w-100"
				placeholder="Version of the software"
				name="version"
				onChange={e => props.dispatch({ type: 'HANDLE_CHANGE', name: 'version', value: e.target.value })}
				value={props.tutorial.version}
			/>
			<b>Introduction</b>
			<TextareaAutosize
				className="w-100"
				placeholder="Introduction"
				name="introduction"
				onChange={e => props.dispatch({ type: 'HANDLE_CHANGE', name: 'introduction', value: e.target.value })}
				value={props.tutorial.introduction}
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
				className="w-100"
				placeholder="Conclusion"
				name="conclusion"
				onChange={e => props.dispatch({ type: 'HANDLE_CHANGE', name: 'conclusion', value: e.target.value })}
				value={props.tutorial.conclusion}
			/>
		</React.Fragment>
	);
};

export default MarkdownWrite;
