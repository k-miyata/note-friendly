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
 * Returns whether the extension should apply the styles.
 */
function shouldApplyStyles() {
  return isNoteDomain() || isArticlePageOnCustomDomain();
}

const prefersDarkMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

/**
 * Sets the data attribute to `<html>` to apply the color scheme.
 */
function applyColorScheme(value) {
  if (shouldApplyStyles()) {
    let colorScheme = value;
    if (value === "auto") {
      if (prefersDarkMediaQuery.matches) {
        colorScheme = "dark";
      } else {
        colorScheme = "light";
      }
    }
    document.documentElement.dataset.chromeExtensionNoteFriendlyColorScheme = colorScheme;
  }
}

/**
 * Applies the color scheme the user choices in the popup.
 */
async function applyCurrentColorScheme() {
  const results = await chrome.storage.local.get("colorScheme");
  const { colorScheme } = results;
  if (colorScheme) {
    applyColorScheme(colorScheme);
  }
}

/**
 * Adds the class to `<html>` to apply the styles.
 */
function applyStyles() {
  if (shouldApplyStyles()) {
    document.documentElement.classList.add("chrome-extension-note-friendly");
  }
}

applyCurrentColorScheme();

chrome.storage.onChanged.addListener((changes) => {
  const { colorScheme } = changes;
  if (colorScheme) {
    applyColorScheme(colorScheme.newValue);
  }
});

prefersDarkMediaQuery.addEventListener("change", applyCurrentColorScheme);

// This content script is injected after the DOM is complete, so you can access
// the DOM without listening to the `DOMContentLoaded` event. See the
// documentation for details on when content scripts are injected:
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/#run_time.
applyStyles();

// Applies the style when the user moves from an unscoped page to a scoped page.
document.addEventListener("transitionend", applyStyles);
