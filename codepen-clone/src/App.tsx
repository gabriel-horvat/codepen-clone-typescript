import * as esbuild from "esbuild-wasm";
import React from "react";
import { useState, useEffect, useRef } from "react";

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const ref = useRef<any>();

  const onClick = () => {
    if (!ref.current) {
      return;
    }

    console.log(ref.current);
    ref.current.focus();
  };

  // initl esbuild
  // const startService = async () => {
  //   ref.current = await esbuild.startService({
  //     worker: true,
  //     wasmURL: "./esbuild.wasm",
  //   });
  // };

  // useEffect(() => {
  //   startService();
  // }, []);

  return (
    <div>
      <h1>CODEPEN CLONE</h1>
      <div>
        <textarea
          value={input}
          ref={ref}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <button onClick={onClick}>submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

export default App;
