function changeBackground() {
  document
    .querySelector('main.p-article:not([hidden])')
    .classList.add('notemu-chromeext', 'enhanced-background');
}

function isArticlePage() {
  const path = location.pathname;
  // "https://note.mu/<Username>/n/<Note ID>" or "https://<Domain>/n/<Note ID>"
  return /^\/[\w\-]+\/n\/n[a-z0-9]{12}$/.test(path) || /^\/n\/n[a-z0-9]{12}$/.test(path);
}

document.body.addEventListener('transitionend', () => {
  if (isArticlePage()) changeBackground();
});

if (isArticlePage()) changeBackground();
