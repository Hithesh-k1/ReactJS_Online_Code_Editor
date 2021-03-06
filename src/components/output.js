import React, { Component } from "react";
import "../App.css";
import HtmlEditor from "./codeEditor.js/htmlEditor";
import CssEditor from "./codeEditor.js/cssEditor";
import JavascriptEditor from "./codeEditor.js/javascriptEditor";
import DownloadButton from "./DownloadButton";
import UploadButton from "./uploadButton";
export default class output extends Component {
  constructor() {
    super();
    this.state = {
      html: "",
      css: "",
      js: "",
    };
  }

  onHtmlChange = (e) => {
    this.setState({ html: e });
  };
  onCssChange = (e) => {
    this.setState({ css: e });
  };
  onJsChange = (e) => {
    this.setState({ js: e });
  };

  componentDidUpdate() {
    this.runCode();
  }

  runCode = () => {
    const { html, css, js } = this.state;
    const iframe = this.refs.iframe;
    const document = iframe.contentDocument;
    const documentContents = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
            <style>
              ${css}
            </style>
          </head>
          <body>
            ${html}

            <script type="text/javascript">
              ${js}
            </script>
          </body>
          </html>
        `;

    document.open();
    document.write(documentContents);
    document.close();
  };

  render() {
    const { html, css, js } = this.state;

    return (
      <>
        <HtmlEditor onHtmlChange={this.onHtmlChange} />
        <CssEditor onCssChange={this.onCssChange} />
        <JavascriptEditor onJsChange={this.onJsChange} />
        <section className="result">
          <DownloadButton html={html} css={css} js={js} />
          <br/>
          <UploadButton/>
          <iframe title="result" className="iframe" ref="iframe" />
        </section>
      </>
    );
  }
}
