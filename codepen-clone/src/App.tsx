import * as esbuild from "esbuild-wasm";
import React from "react";
import { useState, useEffect, useRef } from "react";
import CodeEditor from "./components/code-editor";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const ref = useRef<any>();

  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    // console.log(result);

    setCode(result.outputFiles[0].text);
  };

  // initl esbuild
  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };

  useEffect(() => {
    startService();
  }, []);

  return (
    <div>
      <h1>CODEPEN CLONE</h1>
      <div>
        <CodeEditor
          initialValue="const hi = hello world;"
          onChange={(value) => setInput(value)}
        />
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
