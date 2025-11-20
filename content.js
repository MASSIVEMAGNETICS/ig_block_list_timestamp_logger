// Instagram Block Logger - Content Script
// This script monitors Instagram for block/unblock actions

(function() {
  'use strict';

  // Function to log block/unblock action
  function logAction(username, action) {
    chrome.runtime.sendMessage({
      type: 'LOG_BLOCK_ACTION',
      data: {
        username: username,
        action: action,
        timestamp: Date.now(),
        url: window.location.href
      }
    });
  }

  // Monitor for block/unblock buttons
  function monitorButtons() {
    // Use MutationObserver to watch for DOM changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            checkForBlockActions(node);
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Initial check
    checkForBlockActions(document.body);
  }

  // Check for block/unblock action elements
  function checkForBlockActions(element) {
    // Look for buttons with text containing "Block" or "Unblock"
    const buttons = element.querySelectorAll('button');
    buttons.forEach(button => {
      const buttonText = button.textContent.trim();
      
      if (buttonText.includes('Block') || buttonText.includes('Unblock')) {
        // Skip if already has listener
        if (button.dataset.blockLoggerAttached) return;
        button.dataset.blockLoggerAttached = 'true';
        
        button.addEventListener('click', function(e) {
          setTimeout(() => {
            detectBlockAction(buttonText);
          }, 500);
        });
      }
    });

    // Also monitor confirmation dialogs
    const dialogs = element.querySelectorAll('[role="dialog"]');
    dialogs.forEach(dialog => {
      const confirmButtons = dialog.querySelectorAll('button');
      confirmButtons.forEach(btn => {
        const btnText = btn.textContent.trim();
        if (btnText.includes('Block') || btnText.includes('Unblock')) {
          if (btn.dataset.blockLoggerAttached) return;
          btn.dataset.blockLoggerAttached = 'true';
          
          btn.addEventListener('click', function() {
            setTimeout(() => {
              const username = extractUsername();
              if (username) {
                const action = btnText.toLowerCase().includes('unblock') ? 'unblocked' : 'blocked';
                logAction(username, action);
              }
            }, 300);
          });
        }
      });
    });
  }

  // Extract username from the page
  function extractUsername() {
    // Try to get username from URL
    const urlMatch = window.location.pathname.match(/\/([^\/]+)\/?$/);
    if (urlMatch && urlMatch[1] && urlMatch[1] !== 'instagram.com') {
      return urlMatch[1];
    }

    // Try to get from profile header
    const headerElements = document.querySelectorAll('header h1, header h2');
    for (let elem of headerElements) {
      const text = elem.textContent.trim();
      if (text && !text.includes(' ')) {
        return text;
      }
    }

    // Try to get from any visible username elements
    const usernameElements = document.querySelectorAll('[href*="/"]');
    for (let elem of usernameElements) {
      const href = elem.getAttribute('href');
      if (href && href.startsWith('/') && !href.includes('/p/')) {
        const match = href.match(/\/([^\/\?]+)/);
        if (match && match[1]) {
          return match[1];
        }
      }
    }

    return 'unknown_user';
  }

  // Detect block action from button text changes
  function detectBlockAction(originalButtonText) {
    const username = extractUsername();
    if (!username) return;

    const wasBlockButton = originalButtonText.toLowerCase().includes('block') && 
                          !originalButtonText.toLowerCase().includes('unblock');
    const wasUnblockButton = originalButtonText.toLowerCase().includes('unblock');

    if (wasBlockButton) {
      logAction(username, 'blocked');
    } else if (wasUnblockButton) {
      logAction(username, 'unblocked');
    }
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', monitorButtons);
  } else {
    monitorButtons();
  }

  console.log('Instagram Block Logger: Content script loaded');
})();
