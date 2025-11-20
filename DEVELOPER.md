# Developer Guide

## Quick Start for Development

This guide is for developers who want to understand or modify the extension.

## Architecture Overview

The extension follows the standard Chrome Extension Manifest V3 architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                        Instagram.com                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Content Script (content.js)                         │  │
│  │  - Monitors DOM for block/unblock buttons            │  │
│  │  - Extracts username from page                       │  │
│  │  - Sends messages to background script               │  │
│  └────────────────────┬─────────────────────────────────┘  │
└───────────────────────┼─────────────────────────────────────┘
                        │ chrome.runtime.sendMessage()
                        ▼
        ┌───────────────────────────────────┐
        │  Background Worker (background.js) │
        │  - Receives messages from content  │
        │  - Stores logs in chrome.storage   │
        │  - Updates badge counter           │
        └───────────┬───────────────────────┘
                    │ chrome.storage.local
                    ▼
            ┌───────────────┐
            │ Chrome Storage│
            │  (Local)      │
            └───────┬───────┘
                    │ chrome.storage.local.get()
                    ▼
        ┌───────────────────────────────────┐
        │   Popup UI (popup.html/js/css)    │
        │   - Displays logs                 │
        │   - Export functionality          │
        │   - Clear logs functionality      │
        └───────────────────────────────────┘
```

## File Breakdown

### manifest.json
- Extension configuration file
- Defines permissions, icons, scripts, and metadata
- Uses Manifest V3 format (latest standard)

### content.js
- **Purpose**: Monitors Instagram pages for block/unblock actions
- **Key Functions**:
  - `monitorButtons()`: Sets up MutationObserver to watch for DOM changes
  - `checkForBlockActions()`: Looks for block/unblock buttons and attaches listeners
  - `extractUsername()`: Extracts username from URL or page elements
  - `logAction()`: Sends block/unblock data to background script

### background.js
- **Purpose**: Service worker that handles data persistence
- **Key Functions**:
  - `saveBlockLog()`: Saves block/unblock logs to Chrome Storage
  - Updates extension badge with log count

### popup.html/js/css
- **Purpose**: User interface for viewing and managing logs
- **Key Features**:
  - Displays logs sorted by timestamp (newest first)
  - Export logs as JSON
  - Clear all logs
  - Instagram-themed styling

## How Block Detection Works

1. **Content Script Initialization**: When you visit Instagram, `content.js` loads and sets up a MutationObserver
2. **Button Detection**: The observer watches for buttons with text containing "Block" or "Unblock"
3. **Click Listening**: When detected, click listeners are attached to these buttons
4. **Action Detection**: On click, the script waits briefly then checks if the button text changed
5. **Username Extraction**: Extracts the username from the URL or page elements
6. **Logging**: Sends a message to the background script with username, action, and timestamp
7. **Storage**: Background script saves the log entry to Chrome Storage

## Data Storage Format

Logs are stored in `chrome.storage.local` with this structure:

```javascript
{
  blockLogs: [
    {
      username: "example_user",
      action: "blocked" | "unblocked",
      timestamp: 1700000000000,  // Unix timestamp in milliseconds
      url: "https://www.instagram.com/example_user/"
    },
    // ... more entries
  ]
}
```

## Testing Locally

1. **Load the extension**:
   - Chrome: `chrome://extensions/` → Enable Developer Mode → Load unpacked
   - Firefox: `about:debugging` → Load Temporary Add-on

2. **Open Browser Console**:
   - Check for initialization messages from content.js and background.js

3. **Test on Instagram**:
   - Visit any Instagram profile
   - Click Block/Unblock buttons
   - Check console for log messages

4. **Verify Storage**:
   - Open popup to see logged entries
   - Or inspect `chrome.storage.local` in DevTools

## Debugging Tips

### Content Script Issues
- Open Instagram's browser console (F12)
- Check for errors in content.js
- Look for "Instagram Block Logger: Content script loaded" message

### Background Script Issues
- Go to `chrome://extensions/`
- Click "Inspect views: service worker" under the extension
- Check console for background script logs

### Popup Issues
- Right-click the extension icon → Inspect popup
- Check console for errors in popup.js

## Modifying the Extension

### Add Support for Another Social Media Platform

1. Update `manifest.json` to add host permissions:
```json
"host_permissions": [
  "https://www.instagram.com/*",
  "https://www.facebook.com/*"
]
```

2. Update `content_scripts` matches:
```json
"matches": [
  "https://www.instagram.com/*",
  "https://www.facebook.com/*"
]
```

3. Modify `content.js` to detect platform and adjust selectors accordingly

### Customize UI Theme

- Edit `popup.css` to change colors, fonts, spacing
- Instagram theme uses: `#ed4956` (red), `#0095f6` (blue), `#262626` (dark gray)

### Add Additional Log Fields

1. Update log structure in `content.js`:
```javascript
data: {
  username: username,
  action: action,
  timestamp: Date.now(),
  url: window.location.href,
  // Add new field:
  userBio: extractBio()  
}
```

2. Update `background.js` to save new field

3. Update `popup.js` to display new field

## Code Style

- Use ES6+ features (const, let, arrow functions, template literals)
- Keep functions small and focused
- Add comments for complex logic
- Use meaningful variable names
- Follow existing indentation (2 spaces)

## Common Issues

**MutationObserver not detecting buttons**
- Instagram's dynamic loading may delay button appearance
- Increase timeout in setTimeout if needed

**Username extraction fails**
- Instagram changes their DOM structure frequently
- Update selectors in `extractUsername()` function

**Storage not persisting**
- Check browser permissions
- Verify chrome.storage API is available
- Check storage quota (not usually an issue for small logs)

## Building for Production

This extension doesn't require a build step. To package:

1. **Chrome/Edge**:
   - Go to `chrome://extensions/`
   - Click "Pack extension"
   - Select the extension directory

2. **Firefox**:
   - Use `web-ext` tool: `web-ext build`
   - Or manually create ZIP with all files

## Publishing

### Chrome Web Store
1. Create developer account ($5 one-time fee)
2. Package extension as .zip
3. Upload to Chrome Web Store Developer Dashboard
4. Fill in store listing details
5. Submit for review

### Firefox Add-ons
1. Create Mozilla account (free)
2. Package as .zip or .xpi
3. Upload to addons.mozilla.org
4. Submit for review (required for signatures)

## License

MIT License - See LICENSE file for details
