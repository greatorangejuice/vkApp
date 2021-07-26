import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import {BrowserRouter} from "react-router-dom";

// Init VK  Mini App
bridge.send("VKWebAppInit");

const application = (
    <BrowserRouter>
      <App/>
    </BrowserRouter>
)

ReactDOM.render(application, document.getElementById("root"));
if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
