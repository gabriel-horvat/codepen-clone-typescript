import { useState } from "react";
import CodeEditor from ".//code-editor";
import Preview from ".//preview";
import bundle from "../bundler";

const CodeCell = () => {
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

export default CodeCell;
