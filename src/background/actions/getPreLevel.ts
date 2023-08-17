export default async function getPreLevel() {
  let { preHighLevel } = await chrome.storage.sync.get('preHighLevel');
  preHighLevel = preHighLevel === 0 ? 1 : preHighLevel;
  return preHighLevel;
}
