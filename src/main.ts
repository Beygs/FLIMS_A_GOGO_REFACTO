import "./styles/main.scss";
import App from "./components/App";

const app = new App(document.getElementById("app")!);
app.render();
app.hydrate();
