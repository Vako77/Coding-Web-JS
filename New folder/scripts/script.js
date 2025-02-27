const showBtn = document.getElementById("showBtn");
const popup = document.getElementById("popup");
const popupIframe = document.getElementById("popup-iframe");
const closeBtn = document.getElementById("closeBtn");

require.config({
  paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs" },
});

require(["vs/editor/editor.main"], function () {
  monaco.editor.defineTheme("customTheme", {
    base: "vs-dark",
    inherit: true,
    rules: [{ token: "", foreground: "FFFFFF", background: "2E2E2E" }],
    colors: {
      "editor.background": "#1E1F1F",
      "editor.foreground": "#FFFFFF",
    },
  });

  let htmlEditor = monaco.editor.create(
    document.getElementById("html-editor"),
    {
      value: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Your HTML</title>
</head>
<body>
<h1>Hello, World!</h1>
</body>
</html>`,
      language: "html",
      theme: "customTheme",
      fontSize: 14,
      lineHeight: 1.5,
      wordWrap: "on",
    }
  );

  let cssEditor = monaco.editor.create(document.getElementById("css-editor"), {
    value: `body {
background-color: #1E1F1F;
font-family: Arial, sans-serif;
}`,
    language: "css",
    theme: "customTheme",
    fontSize: 14,
    lineHeight: 1.5,
    wordWrap: "on",
  });

  let jsEditor = monaco.editor.create(document.getElementById("js-editor"), {
    value: `console.log("Hello, World!");`,
    language: "javascript",
    theme: "customTheme",
    fontSize: 14,
    lineHeight: 1.5,
    wordWrap: "on",
  });

  function updateResult() {
    const iframe = document.getElementById("result-iframe");
    const htmlContent = htmlEditor.getValue();
    const cssContent = cssEditor.getValue();
    const jsContent = jsEditor.getValue();

    const content = `
      <html>
          <head>
              <style>${cssContent}</style>
          </head>
          <body style="background-color: #1E1F1F; color: white;">
              ${htmlContent}
              <script>${jsContent}</script>
          </body>
      </html>
    `;

    const iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(content);
    iframeDocument.close();
  }

  htmlEditor.onDidChangeModelContent(updateResult);
  cssEditor.onDidChangeModelContent(updateResult);
  jsEditor.onDidChangeModelContent(updateResult);

  showBtn.onclick = function () {
    const htmlContent = htmlEditor.getValue();
    const cssContent = cssEditor.getValue();
    const jsContent = jsEditor.getValue();

    const content = `
      <html>
          <head>
              <style>${cssContent}</style>
          </head>
          <body style="background-color: #1E1F1F; color: white;">
              ${htmlContent}
              <script>${jsContent}</script>
          </body>
      </html>
    `;

    const popupDoc = popupIframe.contentWindow.document;
    popupDoc.open();
    popupDoc.write(content);
    popupDoc.close();

    popup.style.display = "flex";
  };

  closeBtn.onclick = function () {
    popup.style.display = "none";
  };
});
