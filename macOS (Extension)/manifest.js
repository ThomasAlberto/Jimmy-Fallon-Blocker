
{
  "name": "Jimmy Fallon Blocker",
  "version": "1.0",
  "description": "This extension blocks Jimmy Fallon's face from appearing in YouTube videos.",
  "permissions": [
    "activeTab",
    "tabs",
    "storage",
    "https://www.youtube.com/*"
  ],
  "optional_permissions": [
    "<all_urls>"
  ],
  "content_scripts": [
    {
      "matches": ["https://www.youtube.com/*"],
      "js": ["content.js"]
    }
  ],
  "background": {
    "scripts": ["background.js"],
    "persistent": false
  },
  "browser_action": {
    "default_title": "My Extension",
    "default_popup": "popup.html"
  }
}
