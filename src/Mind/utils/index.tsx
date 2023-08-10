function getFromBackgroundPage(payload: unknown, ignoreError = true) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(payload, (response) => {
      const error = chrome.runtime.lastError;
      if (!ignoreError && error) {
        reject(error);
        return;
      }

      if (!ignoreError && response.success === false) {
        reject(response.error);
        return;
      }
      resolve(response.response);
    });
  });
}

export { getFromBackgroundPage };
