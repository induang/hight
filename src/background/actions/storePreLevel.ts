async function storePreLevel(level: number) {
  await chrome.storage.sync.set({ preHighLevel: level });
}

export default storePreLevel;
