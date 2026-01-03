export function mountAiEditor(root) {
    root.innerHTML = `
    <h1>AI Editor</h1>

    <select id="ai-section">
      <option value="hero">Hero</option>
      <option value="cta">CTA</option>
    </select>

    <br/><br/>

    <textarea id="ai-input" placeholder="Describe your change..."></textarea>

    <br/><br/>

    <button id="ai-apply">Apply Change</button>
    <span id="ai-status"></span>

    <pre id="ai-output"></pre>
  `;
    const textarea = root.querySelector("#ai-input");
    const button = root.querySelector("#ai-apply");
    const output = root.querySelector("#ai-output");
    const select = root.querySelector("#ai-section");
    const status = root.querySelector("#ai-status");
    if (!textarea || !button || !output || !select || !status) {
        throw new Error("AI Editor UI failed to mount");
    }
    button.addEventListener("click", async () => {
        const instruction = textarea.value;
        const section = select.value;
        button.disabled = true;
        status.textContent = `Editing ${section}...`;
        try {
            // 1️⃣ Generate
            const genRes = await fetch("/api/ai-generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ instruction, section })
            });
            const data = await genRes.json();
            output.textContent = JSON.stringify(data, null, 2);
            // 2️⃣ Live preview
            window.dispatchEvent(new CustomEvent("ai-preview", {
                detail: { section, data }
            }));
            // 3️⃣ Persist
            await fetch("/api/ai-edit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ section, content: data })
            });
            status.textContent = `Saved to ${section}`;
        }
        catch (err) {
            console.error(err);
            status.textContent = "Error applying change";
        }
        finally {
            button.disabled = false;
        }
    });
}
