// Background Service Worker for Instagram Block Logger

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'LOG_BLOCK_ACTION') {
    saveBlockLog(message.data);
  }
});

// Save block/unblock log to storage
function saveBlockLog(logData) {
  chrome.storage.local.get(['blockLogs'], function(result) {
    const logs = result.blockLogs || [];
    
    // Add new log entry
    logs.push({
      username: logData.username,
      action: logData.action,
      timestamp: logData.timestamp,
      url: logData.url
    });
    
    // Save back to storage
    chrome.storage.local.set({ blockLogs: logs }, function() {
      console.log('Block action logged:', logData);
      
      // Show notification badge
      chrome.action.setBadgeText({ text: String(logs.length) });
      chrome.action.setBadgeBackgroundColor({ color: '#ed4956' });
    });
  });
}

// Initialize badge on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['blockLogs'], function(result) {
    const logs = result.blockLogs || [];
    if (logs.length > 0) {
      chrome.action.setBadgeText({ text: String(logs.length) });
      chrome.action.setBadgeBackgroundColor({ color: '#ed4956' });
    }
  });
});

console.log('Instagram Block Logger: Background service worker loaded');
