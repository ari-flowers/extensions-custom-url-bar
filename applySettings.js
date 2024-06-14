chrome.storage.sync.get(['theme', 'fontSize'], (result) => {
  const customUrlPreview = document.getElementById('custom-url-preview');
  if (result.theme === 'light') {
    customUrlPreview.style.backgroundColor = 'rgba(250, 250, 250, 0.90)';
    customUrlPreview.style.color = 'black';
  } else {
    customUrlPreview.style.backgroundColor = 'rgba(16, 16, 16, 0.90)';
    customUrlPreview.style.color = 'white';
  }
  if (result.fontSize) customUrlPreview.style.fontSize = `${result.fontSize}px`;
});