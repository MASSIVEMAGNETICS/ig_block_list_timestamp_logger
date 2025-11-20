# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-20

### Added
- Initial release of Instagram Block Logger extension
- Content script to monitor block/unblock actions on Instagram
- Background service worker for local data storage
- Popup interface to view block/unblock logs
- Timestamp recording for all block/unblock actions
- Export functionality to save logs as JSON
- Clear logs functionality
- Badge counter showing number of logged actions
- Instagram-themed UI design
- Comprehensive README and installation guide
- Manifest V3 compliance for modern browser support
- Support for Chrome, Edge, and Brave browsers
- Temporary support for Firefox (requires signing for permanent installation)

### Security
- All data stored locally (no external servers)
- No tracking of browsing activity outside Instagram
- Minimal permissions required (storage, activeTab)
- Only monitors Instagram.com domain
- Passed CodeQL security analysis with zero alerts

### Documentation
- README.md with feature overview and usage instructions
- INSTALL.md with detailed installation steps for all browsers
- Inline code comments for maintainability
- .gitignore to exclude unnecessary files
