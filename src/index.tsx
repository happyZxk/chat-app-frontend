import React from "react";
import ReactDOM from "react-dom/client";
import "@chatui/core/dist/index.css";
// import "./assets/lite";
// import "./assets/lite.css";
// import "@arco-design/web-react/dist/css/arco.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
