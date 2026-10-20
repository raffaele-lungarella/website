const copyIcon = `
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
    <rect x="5.25" y="5.25" width="8" height="8" rx="1.5"></rect>
    <path d="M10.75 5.25v-2a1.5 1.5 0 0 0-1.5-1.5h-6a1.5 1.5 0 0 0-1.5 1.5v6a1.5 1.5 0 0 0 1.5 1.5h2"></path>
  </svg>`;
const checkIcon = `
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
    <path d="m3 8.25 3.25 3.25L13 4.75"></path>
  </svg>`;

document.querySelectorAll(".prose pre").forEach((pre) => {
  const code = pre.querySelector("code");
  if (!code) return;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "copy-code-button";
  button.setAttribute("aria-label", "Copy code");
  button.title = "Copy code";
  button.innerHTML = copyIcon;

  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(code.textContent ?? "");
      button.dataset.copied = "true";
      button.setAttribute("aria-label", "Code copied");
      button.title = "Copied";
      button.innerHTML = checkIcon;

      window.setTimeout(() => {
        delete button.dataset.copied;
        button.setAttribute("aria-label", "Copy code");
        button.title = "Copy code";
        button.innerHTML = copyIcon;
      }, 1800);
    } catch {
      button.setAttribute("aria-label", "Could not copy code");
      button.title = "Could not copy";
    }
  });

  pre.append(button);
});
