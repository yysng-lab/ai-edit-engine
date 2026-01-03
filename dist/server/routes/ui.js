export function handleUI() {
    return new Response(`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>AI Editor</title>
  </head>
  <body>
    <div id="ai-editor-root"></div>
    <script type="module" src="/__ai_edit_ui_app.js"></script>
  </body>
</html>
`, { headers: { "Content-Type": "text/html" } });
}
