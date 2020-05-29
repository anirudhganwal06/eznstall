import React from "react";

const Landing = (props) => {
  return (
    <React.Fragment>
      <section>
        <div className="row no-gutters">
          <div className="col-6 pl-5 pt-5 bg-light">
            <h1>Step1</h1>
            <p>Download a copy of community compass community</p>
          </div>
          <div className="col-6 bg-light">
            <img className="w-100" src="assets/images/dummySS.png" alt="Logo" />
          </div>
          <div className="col-6 pl-5 pt-5 bg-warning">
            <h1>Step2</h1>
            <p>Download a copy of community compass community</p>
          </div>
          <div className="col-6 bg-warning">
            <img className="w-100" src="assets/images/dummySS.png" alt="Logo" />
          </div>
          <div className="col-6 pl-5 pt-5">
            <h1>Step3</h1>
            <p>Download a copy of community compass community</p>
          </div>
          <div className="col-6">
            <img className="w-100" src="assets/images/dummySS.png" alt="Logo" />
          </div>
          <div className="col-6 pl-5 pt-5 bg-warning">
            <h1>Step4</h1>
            <p>Download a copy of community compass community</p>
          </div>
          <div className="col-6 bg-warning">
            <img className="w-100" src="assets/images/dummySS.png" alt="Logo" />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Landing;
