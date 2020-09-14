import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import path from "path";
import fs from "fs";

const manifest = JSON.parse(
  fs.readFileSync(path.resolve("./build/asset-manifest.json"), "utf8")
);

const chunks = Object.keys(manifest.files)
  .filter((key) => /chunk\.js$/.exec(key)) // chunk.js로 끈나는 키를 찾아서
  .map((key) => `<script src="${manifest.files[key]}"></script>`) //스크립트 태그로 변환하고
  .join(""); //합침

function createPage(root) {
  return `<!DOCTYPE html>
  <html lang="en>
  <head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1,shrink-to-fit=no"
    />
    <meta name="theme-color" content="#000000" />
    <title>React App</title>
    <link href="${manifest.files["main.css"]}" rel="stylesheet" />
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">
      ${root}
    </div>
    <script src="${manifest.files["runtime~main.js"]}"></script>
    ${chunks}
    <script src="${manifest.files["main.js"]}"></script>
    </body>
    </html>
    `;
}
const app = express();

//서버 사이드 렌더링을 처리 할 핸들러 함수
const serverRender = (req, res, next) => {
  //이함수는 404가 떠야하는 상황에 404를 띄우지 않고 서버사이드렌더링을 해준다.

  const context = {};
  const jsx = (
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );
  const root = ReactDOMServer.renderToString(jsx); //렌더링
  res.send(createPage(root)); //클라이언트에게 결과물을 응답
};

const serve = express.static(path.resolve("./build"), {
  index: false, // "/" 경로에서 index.html을 보여주지 않도록 설정
});

app.use(serve); //순서가 중요. serverRender전에 위치해야한다!
app.use(serverRender);

//5000포트로 서버를 가동
app.listen(5000, () => {
  console.log("Running on http://localhost:5000");
});