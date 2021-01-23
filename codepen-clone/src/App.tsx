import React from "react";
import { useState } from "react";

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = () => {
    console.log(input);
  };

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
