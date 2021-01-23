import * as esbuild from "esbuild-wasm";
import React from "react";
import { useState, useEffect } from "react";

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = () => {
    console.log(input);
  };

  // initl esbuild
  const startService = async () => {
    const service = await esbuild.startService({
      worker: true,
      wasmURL: "./esbuild.wasm",
    });
    console.log(service);
  };

  useEffect(() => {
    startService();
  }, []);

  return (
    <div>
      <h1>CODEPEN CLONE</h1>
      <div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <button onClick={onClick}>submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

export default App;
