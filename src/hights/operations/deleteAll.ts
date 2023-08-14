import { clearPage as clearPageStorage } from '../storage';

async function deleteAll() {
  await clearPageStorage(window.location.hostname + window.location.pathname);
  window.location.reload();
}

export default deleteAll;
