"use strict";

function translate() {
  document.querySelectorAll("[data-locale]").forEach((element) => {
    element.textContent = chrome.i18n.getMessage(element.dataset.locale);
  });
}

async function getCurrentPreferences() {
  const results = await chrome.storage.local.get("colorScheme");
  const { colorScheme } = results;
  if (colorScheme) {
    const radio = document.querySelector(`input[name=colorScheme][value='${colorScheme}']`);
    if (radio) {
      radio.checked = true;
    }
  }
}

async function setColorScheme(value) {
  await chrome.storage.local.set({ colorScheme: value });
  getCurrentPreferences();
}

function addEventListenersToControls() {
  document.querySelectorAll("input[name=colorScheme]").forEach((radio) => {
    radio.addEventListener("change", (event) => {
      setColorScheme(event.currentTarget.value);
    });
  });
}

document.addEventListener("DOMContentLoaded", translate);
document.addEventListener("DOMContentLoaded", getCurrentPreferences);
document.addEventListener("DOMContentLoaded", addEventListenersToControls);
