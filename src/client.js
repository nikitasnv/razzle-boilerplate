import React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ThemeedComponent from "./components/ThemeedComponent";
import createStore from "./store/Store.ts";
import App from "./views/App/App";

const store = createStore(window.__PRELOADED_STATE__);

hydrate(
  <Provider store={store}>
    <ThemeedComponent>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeedComponent>
  </Provider>,
  document.getElementById("root"),
  () => {
    const jssStyles = document.getElementById("jss-ssr");
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
    const initStore = document.getElementById("preloaded-store");
    if (initStore && initStore.parentNode)
      initStore.parentNode.removeChild(initStore);
  }
);

if (module.hot) {
  module.hot.accept();
}
