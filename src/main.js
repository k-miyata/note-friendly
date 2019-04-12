function changeBackground() {
  document
    .querySelector('body.ns-note main:not([hidden])')
    .classList.add('notemu-chromeext', 'enhanced-background');
}

function isArticlePage() {
  const path = location.pathname;
  // "https://note.mu/<Username>/n/<Note ID>" or "https://<Domain>/n/<Note ID>"
  return /^\/[\w\-]+\/n\/\w+$/.test(path) || /^\/n\/\w+$/.test(path);
}

document.body.addEventListener('transitionend', () => {
  if (isArticlePage()) changeBackground();
});

if (isArticlePage()) changeBackground();
