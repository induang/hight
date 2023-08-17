export default async function getPreLevel() {
  const { preHighLevel } = await chrome.storage.sync.get('preHighLevel');
  return preHighLevel;
}
