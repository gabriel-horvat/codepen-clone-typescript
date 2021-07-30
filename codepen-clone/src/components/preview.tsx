import React from "react";
import { useEffect, useRef } from "react";
import "./preview.css";

interface PreviewProps {
  code: string;
}

// try catch block below wont catch async errors

const html = `<html>
  <head>
  <style> html {background-color: white;} </style>
  </head>
  <body>
  <div id = 'root'> </div>
  <script>
  window.addEventListener('message', (event) => {
    try {
      eval(event.data);
    } catch (err) {
      const root = document.querySelector('#root');
root.innerHTML = '<div style = "color: red;" >' + err + '</div>'
console.error(err);
    }

      }, false);
  </script>
  </body>
  </html>`;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframe}
        sandbox="allow-scripts"
        title="I'm the one and only iframe"
        srcDoc={html}
      />
    </div>
  );
};

export default Preview;
