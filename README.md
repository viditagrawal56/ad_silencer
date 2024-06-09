# Ad Muter Extension ( Currently Works only for Youtube )

## Overview
The Ad Muter is a Chrome extension that automatically mutes ads while playing content on website. The extension monitors the tab for ads and mutes the tab when an ad is detected, unmuting it when the ad ends.

## Features
- Automatically mutes the tab when an ad is detected.
- Unmutes the tab when the ad ends.
- Toggle monitoring on and off using a popup button.
 
## Files
- `background.js`: Handles background tasks such as starting and stopping the content script.
- `content.js`: Runs in the context of the current tab, detecting ads and sending mute/unmute messages.
- `popup.js`: Manages the UI for starting and stopping ad monitoring.
- `popup.html`: The HTML file for the popup UI.
- `manifest.json`: The manifest file that defines the extension's settings and permissions.

## Usage
1. Click on the extension icon to open the popup.
2. Click the "Start Monitoring" button to begin monitoring for ads.
3. Click the "Stop Monitoring" button to stop monitoring for ads.
