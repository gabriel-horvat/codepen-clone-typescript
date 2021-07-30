import { useState, useEffect } from "react";
import CodeEditor from ".//code-editor";
import Preview from ".//preview";
import bundle from "../bundler";
import Resizable from "./resizable";

const CodeCell = () => {
  // input is whatever the user is typing into editor
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    // only execute user's code after 1sec
    const timer = setTimeout(async () => {
      // bundle input
      const output = await bundle(input);
      // update code state
      setCode(output.code);
      setErr(output.err);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="console.log('hi');"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
