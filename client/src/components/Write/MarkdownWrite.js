import React from "react";
import TextareaAutosize from "react-textarea-autosize";

const MarkdownWrite = (props) => {
  const tutorialJSX = [];
  tutorialJSX.push(
    <TextareaAutosize
        key="step-0"
        className="w-100"
        placeholder="Step 1"
        name="step"
        data-step-number="0"
        onChange={props.onChange}
      />
  );
  tutorialJSX.push(
    <TextareaAutosize
        key="step-1"
        className="w-100"
        placeholder="Step 2"
        name="step"
        data-step-number="1"
        onChange={props.onChange}
      />
  );
  tutorialJSX.push(
    <TextareaAutosize
        key="step-2"
        className="w-100"
        placeholder="Step 3"
        name="step"
        data-step-number="2"
        onChange={props.onChange}
      />
  );
  tutorialJSX.push(
    <TextareaAutosize
        key="step-3"
        className="w-100"
        placeholder="Step 4"
        name="step"
        data-step-number="3"
        onChange={props.onChange}
      />
  );

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
      {tutorialJSX}
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
