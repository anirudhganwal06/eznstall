import React from "react";
import styles from "./Installations.module.css";

const Installations = (props) => {
  // Creating an array of installation summary
  const installationsJSX = [];
  for (let i = 0; i < 20; i++) {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const hsp = Math.sqrt(
      0.2 * (red * red) + 0.4 * (green * green) + 0.1 * (blue * blue)
    );
    let randomColor = `rgb(${red}, ${green}, ${blue})`;
    installationsJSX.push(
      <div
        key={i}
        className={`${styles["installation-summary"]} col-7 my-2 ${
          hsp > 127.5 ? "text-dark" : "text-white"
        }`}
        style={{
          backgroundColor: randomColor,
        }}
        onClick={() => props.history.push('/installation')}
      >
        <h1>Google Chrome</h1>
        <p>
          Google Chrome is a cross-platform web browser developed by Google.
          lorem ipsum dolar
        </p>
      </div>
    );
  }

  return (
    <React.Fragment>
      <section className="heading-sec">
        <h1 className="text-center page-heading">Installations</h1>
      </section>
      <section className={styles["list-container"]}>
        <div className="row justify-content-around">{installationsJSX}</div>
      </section>
    </React.Fragment>
  );
};

export default Installations;
