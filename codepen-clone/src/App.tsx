import React from "react";
import { useState } from "react";
import CodeEditor from "./components/code-editor";
import Preview from "./components/preview";
import bundle from "./bundler";
import CodeCell from "./components/code-cell";

const App = () => {
  return (
    <div>
      <h1>CODEPEN CLONE</h1>
      <CodeCell />
    </div>
  );
};

export default App;
