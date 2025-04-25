import "./global.css";
import createMain from "./views/common/sections/main/main";
import createFooter from "./views/common/sections/footer/footer";
import PageRouter from "./router/page-router";
import Header from "./views/common/sections/header/header";

export default function initApp(root: HTMLElement) {
  root.innerHTML = "";

  const header = Header.create();
  const main = createMain();
  const footer = createFooter();

  root.append(header, main, footer);
  PageRouter.init();
}
