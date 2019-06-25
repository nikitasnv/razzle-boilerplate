import { ServerStyleSheets, ThemeProvider } from "@material-ui/styles";
import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import { fakeApi } from "./api";
import { defaultState } from "./store/Reducers.ts";
import createStore from "./store/Store.ts";
import theme from "./theme";
import App from "./views/App/App";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get("/*", (req, res) => {
    fakeApi(apiResult => {
      const context = {};

      const count = parseInt(req.query.count) || apiResult || 0;
      const mutatedState = { ...defaultState, count, color: "#000000" };
      const store = createStore(mutatedState);

      const sheets = new ServerStyleSheets();

      const markup = renderToString(
        sheets.collect(
          <Provider store={store}>
            <ThemeProvider theme={theme({ primary: store.getState().color })}>
              <StaticRouter context={context} location={req.url}>
                <App />
              </StaticRouter>
            </ThemeProvider>
          </Provider>
        )
      );

      const css = sheets.toString();

      if (context.url) {
        res.redirect(context.url);
      } else {
        res.status(200).send(
          `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${css ? `<style id='jss-ssr'>${css}</style>` : ""}
        ${
          process.env.NODE_ENV === "production"
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
        <script id="preloaded-store">
        window.__PRELOADED_STATE__ = ${JSON.stringify(mutatedState).replace(
          /</g,
          "\\u003c"
        )}
      </script>
    </head>
    <body>
        <div id="root">${markup}</div>
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ""
        }
    </body>
</html>`
        );
      }
    });
  });

export default server;
