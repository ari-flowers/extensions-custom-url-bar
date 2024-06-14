console.log("Custom URL Preview extension loaded.");

// Create and style the custom URL preview element
let customUrlPreview = document.createElement('div');
customUrlPreview.id = 'custom-url-preview';
document.body.appendChild(customUrlPreview);

// Apply settings from storage
chrome.storage.sync.get(['theme', 'fontSize'], (result) => {
  const theme = result.theme || 'dark';
  const fontSize = result.fontSize || 16;

  if (theme === 'light') {
    customUrlPreview.style.backgroundColor = 'rgba(250, 250, 250, 0.90)';
    customUrlPreview.style.color = 'black';
  } else {
    customUrlPreview.style.backgroundColor = 'rgba(16, 16, 16, 0.90)';
    customUrlPreview.style.color = 'white';
  }
  customUrlPreview.style.fontSize = `${fontSize}px`;
});

// Listen for messages to update settings dynamically
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.theme) {
    if (request.theme === 'light') {
      customUrlPreview.style.backgroundColor = 'rgba(250, 250, 250, 0.90)';
      customUrlPreview.style.color = 'black';
    } else {
      customUrlPreview.style.backgroundColor = 'rgba(16, 16, 16, 0.90)';
      customUrlPreview.style.color = 'white';
    }
  }
  if (request.fontSize) {
    customUrlPreview.style.fontSize = `${request.fontSize}px`;
  }
});

// Update and show URL preview
function showCustomUrlPreview(event) {
  const linkElement = event.target.closest('a');
  if (linkElement && linkElement.href) {
    customUrlPreview.textContent = linkElement.href;
    customUrlPreview.style.display = 'block';
  }
}

// Hide custom URL preview
function hideCustomUrlPreview(event) {
  const linkElement = event.target.closest('a');
  if (linkElement) {
    customUrlPreview.style.display = 'none';
  }
}

// Event listeners for all link elements
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('mouseover', showCustomUrlPreview);
  link.addEventListener('mouseout', hideCustomUrlPreview);
});