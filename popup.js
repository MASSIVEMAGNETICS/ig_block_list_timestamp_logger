// Load and display logs
function loadLogs() {
  chrome.storage.local.get(['blockLogs'], function(result) {
    const logs = result.blockLogs || [];
    const logList = document.getElementById('logList');
    const emptyMessage = document.getElementById('emptyMessage');
    
    if (logs.length === 0) {
      emptyMessage.style.display = 'block';
      logList.style.display = 'none';
    } else {
      emptyMessage.style.display = 'none';
      logList.style.display = 'block';
      logList.innerHTML = '';
      
      // Sort logs by timestamp (newest first)
      logs.sort((a, b) => b.timestamp - a.timestamp);
      
      logs.forEach(log => {
        const li = document.createElement('li');
        const logItem = document.createElement('div');
        logItem.className = 'log-item';
        
        const actionSpan = document.createElement('span');
        actionSpan.className = `log-action ${log.action}`;
        actionSpan.textContent = log.action === 'blocked' ? '🚫 Blocked' : '✅ Unblocked';
        
        const usernameSpan = document.createElement('span');
        usernameSpan.className = 'log-username';
        usernameSpan.textContent = `@${log.username}`;
        
        const timestampSpan = document.createElement('span');
        timestampSpan.className = 'log-timestamp';
        timestampSpan.textContent = new Date(log.timestamp).toLocaleString();
        
        logItem.appendChild(actionSpan);
        logItem.appendChild(usernameSpan);
        logItem.appendChild(timestampSpan);
        li.appendChild(logItem);
        logList.appendChild(li);
      });
    }
  });
}

// Clear all logs
document.getElementById('clearBtn').addEventListener('click', function() {
  if (confirm('Are you sure you want to clear all logs?')) {
    chrome.storage.local.set({ blockLogs: [] }, function() {
      loadLogs();
    });
  }
});

// Export logs as JSON
document.getElementById('exportBtn').addEventListener('click', function() {
  chrome.storage.local.get(['blockLogs'], function(result) {
    const logs = result.blockLogs || [];
    const dataStr = JSON.stringify(logs, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `instagram_block_logs_${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  });
});

// Load logs when popup opens
document.addEventListener('DOMContentLoaded', loadLogs);
