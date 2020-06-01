import React, { useState } from "react";

import "./Write.module.css";
import MarkdownWrite from "./MarkdownWrite";
import MarkdownRenderer from "./MarkdownRenderer";

const Write = (props) => {
  const [tutorial, setTutorial] = useState({
    introduction: "",
    steps: [""],
    conclusion: "",
  });

  const onChange = (e, i) => {
    const newTutorial = { ...tutorial };
    if (e.target.name === "step") {
      newTutorial.steps[i] = e.target.value;
    } else {
      newTutorial[e.target.name] = e.target.value;
    }
    setTutorial(newTutorial);
  };

  const addStep = (i) => {
    const newTutorial = { ...tutorial };
    newTutorial.steps.splice(i, 0, "");
    setTutorial(newTutorial);
  };

  const removeStep = (i) => {
    const newTutorial = { ...tutorial };
    newTutorial.steps.splice(i, 1);
    setTutorial(newTutorial);
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
              onChange={onChange}
              addStep={addStep}
              removeStep={removeStep}
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
