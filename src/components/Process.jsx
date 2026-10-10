import React from "react";
import { PROCESS } from "../data/site";

const Process = () => (
  <section className="steps section" id="process">
    <div className="container">
      <header className="section-head">
        <h2 className="section-head--title">How a project works</h2>
      </header>
      <ol className="steps--list">
        {PROCESS.map((step) => (
          <li key={step.title}>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Process;
