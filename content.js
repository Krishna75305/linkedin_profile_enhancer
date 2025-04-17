(async () => {
  const widgetId = "linkedin-widget-enhancer";
  const toggleButtonId = "linkedin-widget-toggle-btn";

  if (document.getElementById(widgetId)) return;

  const data = {
    companyName: "TechCorp",
    matchScore: 86,
    accountStatus: "Target"
  };

  const widget = document.createElement("div");
  widget.id = widgetId;
  widget.innerHTML = `
    <div class="widget-header">
      <strong>${data.companyName}</strong>
    </div>
    <div class="match-score">
      <span>Match Score: ${data.matchScore}</span>
      <div class="progress-bar">
        <div class="progress" style="width: ${data.matchScore}%"></div>
      </div>
    </div>
    <div class="status-tag ${data.accountStatus === "Target" ? "green" : "red"}">
      ${data.accountStatus}
    </div>
  `;

  document.body.appendChild(widget);

  const waitForProfileHeader = () =>
    new Promise((resolve) => {
      const interval = setInterval(() => {
        const target = document.querySelector(".pv-text-details__left-panel");
        if (target) {
          clearInterval(interval);
          resolve(target);
        }
      }, 500);
    });

  const header = await waitForProfileHeader();

  const toggleBtn = document.createElement("button");
  toggleBtn.id = toggleButtonId;
  toggleBtn.textContent = "Toggle Enhancer";
  toggleBtn.style.cssText = `
    margin-top: 10px;
    padding: 6px 12px;
    font-size: 14px;
    border-radius: 8px;
    border: none;
    background-color: #0a66c2;
    color: white;
    cursor: pointer;
  `;

  header.appendChild(toggleBtn);

  chrome.storage.sync.get(["widgetVisible"], (res) => {
    widget.style.display = res.widgetVisible === false ? "none" : "block";
  });

  toggleBtn.addEventListener("click", () => {
    const isVisible = widget.style.display !== "none";
    widget.style.display = isVisible ? "none" : "block";
    chrome.storage.sync.set({ widgetVisible: !isVisible });
  });
})();