// pages/_document.js
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { useState } from "react";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
