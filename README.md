# Instagram Block Logger

A browser extension that logs timestamps when you block or unblock users on Instagram.

## Features

- 🚫 Automatically detects when you block users on Instagram
- ✅ Tracks when you unblock users
- ⏰ Records timestamps for all block/unblock actions
- 📊 View your complete block/unblock history in the extension popup
- 💾 Export logs as JSON for backup or analysis
- 🧹 Clear logs when needed

## Installation

### Chrome/Edge

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked"
5. Select the extension directory

### Firefox

1. Download or clone this repository
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Select the `manifest.json` file from the extension directory

## Usage

1. Install the extension following the instructions above
2. Visit Instagram (https://www.instagram.com)
3. When you block or unblock a user, the action will be automatically logged
4. Click the extension icon in your browser toolbar to view your block/unblock history
5. Use the "Export" button to download your logs as a JSON file
6. Use the "Clear Logs" button to delete all logged entries

## Privacy

This extension:
- Only works on Instagram.com
- Stores all data locally in your browser (using Chrome Storage API)
- Does not send any data to external servers
- Does not track your browsing activity outside of Instagram
- Only monitors block/unblock actions

## Technical Details

The extension consists of:
- **manifest.json**: Extension configuration
- **content.js**: Script that monitors Instagram for block/unblock actions
- **background.js**: Service worker that handles data storage
- **popup.html/css/js**: User interface for viewing and managing logs

## Permissions

- `storage`: To save block/unblock logs locally
- `activeTab`: To access Instagram pages when you use the extension
- `host_permissions` for `instagram.com`: To monitor block/unblock actions

## Development

The extension is built using:
- Manifest V3 (latest Chrome extension format)
- Vanilla JavaScript (no frameworks required)
- Chrome Storage API for data persistence

## License

MIT License - feel free to modify and use as needed.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
