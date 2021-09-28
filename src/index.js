import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SocketContext, socket } from "./context/socket";

ReactDOM.render(
  <React.StrictMode>
    <SocketContext.Provider value={socket}>
      <App />
    </SocketContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
