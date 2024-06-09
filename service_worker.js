chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const tabId = message.tabId || (sender.tab && sender.tab.id);
  if (!tabId) {
    console.error("Message sent without a valid tab ID");
    return;
  }

  if (message.action === "mute") {
    chrome.tabs.update(tabId, { muted: true });
  } else if (message.action === "unmute") {
    chrome.tabs.update(tabId, { muted: false });
  } else if (message.action === "startMonitoring") {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["content.js"],
    });
  } else if (message.action === "stopMonitoring") {
    chrome.tabs.reload(tabId);
  }
});
