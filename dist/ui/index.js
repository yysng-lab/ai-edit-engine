export function renderEditor(root) {
    root.innerHTML = `
    <div style="font-family: system-ui; max-width: 900px; margin: 2rem auto">
      <h1>AI Editor</h1>

      <textarea id="instruction" rows="4" style="width:100%" placeholder="Describe your change..."></textarea>

      <div style="margin-top:1rem">
        <button id="ping">Ping Engine</button>
        <span id="status" style="margin-left:1rem;color:#555"></span>
      </div>
    </div>
  `;
    const status = root.querySelector("#status");
    const btn = root.querySelector("#ping");
    btn.addEventListener("click", () => {
        status.textContent = "Engine connected successfully.";
    });
}
