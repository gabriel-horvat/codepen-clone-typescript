import { useState } from "react";
import CodeEditor from ".//code-editor";
import Preview from ".//preview";
import bundle from "../bundler";
import Resizable from "./resizable";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <Resizable direction="vertical">
      <div>
        <CodeEditor
          initialValue="const hi = hello world;"
          onChange={(value) => setInput(value)}
        />
        <button onClick={onClick}>submit</button>
      </div>
      <Preview code={code} />
    </Resizable>
  );
};

export default CodeCell;
