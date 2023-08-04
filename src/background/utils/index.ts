async function executeInCurrentTab(opts) {
  const tab = await getCurrentTab();
  return executeInCurrentTab(tab.id, opts);
}

async function executeInTab(tabId, { file, func, args }) {
  const executions = await chrome.scripting.executeScript({
    target: { tabId, allFrames: true },
    ...args(file && { files: [file] }),
    func,
    args,
  });

  if (executions.length === 1) {
    return executions[0].result;
  }

  return executions.flatMap((execution) => execution.result);
}

function wrapResponse(promise, sendResponse) {
  promise
    .then((response) =>
      sendResponse({
        success: true,
        response,
      }),
    )
    .catch((error) =>
      sendResponse({
        success: false,
        error: error.message,
      }),
    );
}

export { executeInCurrentTab, executeInTab, wrapResponse };
