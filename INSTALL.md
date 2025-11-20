# Installation Guide

## For Chrome/Edge/Brave

1. **Download the Extension**
   - Clone this repository or download it as a ZIP file
   - If you downloaded a ZIP, extract it to a folder

2. **Open Extensions Page**
   - Open your browser
   - Navigate to `chrome://extensions/` (or `edge://extensions/` for Edge)

3. **Enable Developer Mode**
   - Look for a toggle switch labeled "Developer mode" in the top-right corner
   - Turn it ON

4. **Load the Extension**
   - Click the "Load unpacked" button
   - Navigate to the folder containing the extension files
   - Select the folder and click "Select Folder" or "Open"

5. **Verify Installation**
   - You should see "Instagram Block Logger" appear in your extensions list
   - The extension icon should appear in your browser toolbar

## For Firefox

1. **Download the Extension**
   - Clone this repository or download it as a ZIP file
   - If you downloaded a ZIP, extract it to a folder

2. **Open Debugging Page**
   - Open Firefox
   - Navigate to `about:debugging#/runtime/this-firefox`

3. **Load Temporary Add-on**
   - Click "Load Temporary Add-on..."
   - Navigate to the extension folder
   - Select the `manifest.json` file
   - Click "Open"

4. **Verify Installation**
   - The extension should appear in the list of temporary extensions
   - The extension icon should appear in your browser toolbar

**Note for Firefox**: Temporary add-ons are removed when Firefox is closed. For permanent installation, the extension would need to be signed and published to addons.mozilla.org.

## Using the Extension

1. **Navigate to Instagram**
   - Go to https://www.instagram.com
   - Log in to your account

2. **Block or Unblock Users**
   - Visit any user profile
   - Click the "Block" or "Unblock" button
   - The action will be automatically logged

3. **View Your Logs**
   - Click the extension icon in your browser toolbar
   - See all your block/unblock actions with timestamps
   - Use "Export" to download logs as JSON
   - Use "Clear Logs" to delete all entries

## Troubleshooting

**Extension not working?**
- Make sure you're on instagram.com
- Refresh the page after installing the extension
- Check browser console for any error messages

**Logs not appearing?**
- Click the extension icon to open the popup
- Make sure you've actually blocked or unblocked someone
- Try refreshing Instagram and trying again

**Can't load the extension?**
- Make sure Developer Mode is enabled (Chrome/Edge)
- Verify all files are present in the extension folder
- Check that manifest.json is valid JSON

## Uninstallation

**Chrome/Edge/Brave:**
- Go to `chrome://extensions/`
- Find "Instagram Block Logger"
- Click "Remove"

**Firefox:**
- Go to `about:debugging#/runtime/this-firefox`
- Find the extension
- Click "Remove"
