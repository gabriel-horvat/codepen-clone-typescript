import React from "react";
import { useState } from "react";
import CodeEditor from "./components/code-editor";
import Preview from "./components/preview";
import bundle from "./bundler";

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <div>
      <h1>CODEPEN CLONE</h1>
      <div>
        <CodeEditor
          initialValue="const hi = hello world;"
          onChange={(value) => setInput(value)}
        />
        <button onClick={onClick}>submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

export default App;
