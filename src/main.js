/**
 * Returns whether the user is on one of the pages on Note.
 */
function isNoteDomain() {
  return document.location.hostname === "note.com";
}

/**
 * Returns whether the user is on one of the article pages on Note connected to
 * a custom domain. For these pages, applies the style only to the article pages
 * that can be exactly determined to be on Note.
 */
function isArticlePageOnCustomDomain() {
  return /^\/n\/n[a-z0-9]{12}$/.test(document.location.pathname);
}

/**
 * Adds the class to `<html>` to apply the styles.
 */
function applyStyles() {
  document.documentElement.classList.add("chrome-extension-note-friendly");
}

// This content script is injected after the DOM is complete, so you can access
// the DOM without listening to the `DOMContentLoaded` event. See the
// documentation for details on when content scripts are injected:
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/#run_time.
if (isNoteDomain() || isArticlePageOnCustomDomain()) {
  applyStyles();
}
