import { clearPage as clearPageStorage } from '../storage';

function deleteAll() {
  clearPageStorage(
    window.location.hostname + window.location.pathname,
    window.location.pathname,
  );
  window.location.reload();
}

export default deleteAll;
