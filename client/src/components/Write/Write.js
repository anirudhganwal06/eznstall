import React, { useState, useEffect } from "react";

import styles from "./Write.module.css";
import MarkdownWrite from "./MarkdownWrite";
import MarkdownRenderer from "./MarkdownRenderer";

const Write = (props) => {
  const [tutorial, setTutorial] = useState({
    introduction: "",
    steps: [],
    conclusion: ""
  });

  const onChange = (e) => {
    const newTutorial = { ...tutorial };
    if (e.target.name === "step") {
      const stepNumber = e.target.getAttribute("data-step-number");
      newTutorial.steps[stepNumber] = e.target.value;
    } else {
      newTutorial[e.target.name] = e.target.value;
    }
    setTutorial(newTutorial);
  };

  useEffect(() => {
    console.log(tutorial);
  }, [tutorial]);

  return (
    <React.Fragment>
      <section className="heading-sec">
        <h1 className="text-center page-heading">Write</h1>
      </section>
      <section className="container-fluid">
        <div className="row">
          <div className="col-8">
            <MarkdownWrite onChange={onChange} />
          </div>
          <div className="col-4">
            <MarkdownRenderer tutorial={tutorial} />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Write;
