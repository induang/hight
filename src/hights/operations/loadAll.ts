import { loadAll as loadAllFromStorage } from '../storage';

function loadAll() {
  function loadAllHightsOnPage() {
    loadAllFromStorage(
      window.location.hostname + window.location.pathname,
      window.location.pathname,
    );
  }

  if (document.readyState === 'loading') {
    document.removeEventListener('DOMContentLoaded', loadAllHightsOnPage);
    document.addEventListener('DOMContentLoaded', loadAllHightsOnPage);
  } else {
    loadAllHightsOnPage();
  }
}

export default loadAll;
