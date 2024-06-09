document.addEventListener("DOMContentLoaded", () => {
  const statusElement = document.getElementById("status");
  const toggleButton = document.getElementById("toggle-button");

  chrome.storage.local.get(["monitoring"], (result) => {
    if (result.monitoring) {
      statusElement.textContent = "Monitoring is on";
      toggleButton.textContent = "Stop Monitoring";
    } else {
      statusElement.textContent = "Monitoring is off";
      toggleButton.textContent = "Start Monitoring";
    }
  });

  toggleButton.addEventListener("click", () => {
    chrome.storage.local.get(["monitoring"], (result) => {
      const monitoring = !result.monitoring;
      chrome.storage.local.set({ monitoring }, () => {
        statusElement.textContent = monitoring
          ? "Monitoring is on"
          : "Monitoring is off";
        toggleButton.textContent = monitoring
          ? "Stop Monitoring"
          : "Start Monitoring";

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs.length > 0) {
            chrome.runtime.sendMessage({
              action: monitoring ? "startMonitoring" : "stopMonitoring",
              tabId: tabs[0].id,
            });
          }
        });
      });
    });
  });
});
