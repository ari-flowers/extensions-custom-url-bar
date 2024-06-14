chrome.runtime.onInstalled.addListener(() => {
  // Set default values for theme and font size
  chrome.storage.sync.set({ theme: 'dark', fontSize: 16 });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: '' },
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });

  // Create the main context menu item
  chrome.contextMenus.create({
    id: "customUrlBar",
    title: "Custom URL Bar",
    contexts: ["all"]
  });

  // Create a submenu for themes
  chrome.contextMenus.create({
    id: "darkTheme",
    parentId: "customUrlBar",
    title: "Dark Theme",
    type: "radio",
    contexts: ["all"],
    checked: true
  });

  chrome.contextMenus.create({
    id: "lightTheme",
    parentId: "customUrlBar",
    title: "Light Theme",
    type: "radio",
    contexts: ["all"]
  });

  // Create a submenu for font sizes
  chrome.contextMenus.create({
    id: "fontSize",
    parentId: "customUrlBar",
    title: "Font Size",
    contexts: ["all"]
  });

  const fontSizes = [8, 10, 12, 14, 16, 18, 20, 22];
  fontSizes.forEach(size => {
    chrome.contextMenus.create({
      id: `fontSize${size}`,
      parentId: "fontSize",
      title: `${size}px`,
      type: "radio",
      contexts: ["all"],
      checked: size === 16 // Default checked value
    });
  });

  // Add actions for context menu clicks
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "darkTheme") {
      chrome.storage.sync.set({ theme: 'dark' });
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['applySettings.js']
      });
    } else if (info.menuItemId === "lightTheme") {
      chrome.storage.sync.set({ theme: 'light' });
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['applySettings.js']
      });
    } else if (info.menuItemId.startsWith('fontSize')) {
      const fontSize = parseInt(info.menuItemId.replace('fontSize', ''), 10);
      chrome.storage.sync.set({ fontSize: fontSize });
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['applySettings.js']
      });
    }
  });
});
