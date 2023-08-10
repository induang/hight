/* eslint-disable @typescript-eslint/ban-types */
async function getCurrentTab(): Promise<chrome.tabs.Tab> {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function executeInCurrentTab({
  file,
  func,
  args,
}: {
  file?: string;
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  func: (...args: any[]) => unknown;
  args?: Array<unknown>;
}) {
  const tab = await getCurrentTab();
  return executeInTab(tab.id!, { file, func, args });
}

async function executeInTab(
  tabId: number,
  {
    file,
    func,
    args,
  }: {
    file?: string;
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
    func: (...args: any[]) => unknown;
    args?: Array<unknown>;
  },
) {
  const executions = await chrome.scripting.executeScript({
    target: { tabId, allFrames: true },
    ...(file && { files: [file] }),
    func,
    args,
  });
  if (executions.length === 1) {
    return executions[0].result;
  }

  return executions.flatMap((execution) => execution.result);
}

function wrapResponse(promise: Promise<unknown>, sendResponse: Function) {
  promise
    .then((response) =>
      sendResponse({
        success: true,
        response,
      }),
    )
    .catch((error: Error) =>
      sendResponse({
        success: false,
        error: error.message,
      }),
    );
}

export { executeInCurrentTab, executeInTab, wrapResponse };
