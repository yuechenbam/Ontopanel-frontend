import { makeConvertorWnd } from "./convertor/index.js";

let appDiv = document.getElementById("app");

let app = makeConvertorWnd();
appDiv.appendChild(app);
