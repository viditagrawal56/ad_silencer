(() => {
  if (window.adMonitoringInterval) {
    // If the monitoring interval is already defined, it means the script is already running
    console.log("Ad monitoring is already running.");
    return;
  }

  let adDetected = false;

  function isAdPlaying() {
    const adElements = document.querySelectorAll(
      ".ad-class, .ad-container, .ad-banner"
    );
    if (adElements.length > 0) {
      return true;
    }

    const videoPlayer = document.querySelector("video");
    if (videoPlayer) {
      const currentSrc = videoPlayer.currentSrc;
      const duration = videoPlayer.duration;
      if (duration < 30 || currentSrc.includes("ad")) {
        return true;
      }
    }
    return false;
  }

  function startMonitoring() {
    adMonitoringInterval = setInterval(() => {
      const isAd = isAdPlaying();
      if (isAd && !adDetected) {
        adDetected = true;
        chrome.runtime.sendMessage({ action: "mute" });
      } else if (!isAd && adDetected) {
        adDetected = false;
        chrome.runtime.sendMessage({ action: "unmute" });
      }
    }, 1000);

    // Store the interval ID in the global window object to avoid redeclaration
    window.adMonitoringInterval = adMonitoringInterval;
  }

  chrome.storage.local.get(["monitoring"], (result) => {
    if (result.monitoring) {
      startMonitoring();
    }
  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "stopMonitoring") {
      clearInterval(window.adMonitoringInterval);
      delete window.adMonitoringInterval;
    }
  });
})();
