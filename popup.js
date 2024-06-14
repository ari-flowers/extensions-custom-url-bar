document.addEventListener('DOMContentLoaded', () => {
  const theme = document.getElementById('theme');
  const fontSize = document.getElementById('fontSize');
  const fontSizeDisplay = document.getElementById('fontSizeDisplay');
  const saveButton = document.getElementById('saveSettings');

  // Load settings from storage
  chrome.storage.sync.get(['theme', 'fontSize'], (result) => {
    if (result.theme) theme.value = result.theme;
    if (result.fontSize) {
      fontSize.value = result.fontSize;
      fontSizeDisplay.textContent = `${result.fontSize}px`;
    }
  });

  // Update the font size display when the range input changes
  fontSize.addEventListener('input', () => {
    fontSizeDisplay.textContent = `${fontSize.value}px`;
  });

  // Save settings
  saveButton.addEventListener('click', () => {
    chrome.storage.sync.set({
      theme: theme.value,
      fontSize: fontSize.value
    }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { theme: theme.value, fontSize: fontSize.value });
        window.close();
      });
    });
  });
});