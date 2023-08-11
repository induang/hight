let showHighterCursor = false;

function hightOnSelection() {
  if (!showHighterCursor) return;

  const selection = window.getSelection();
  const selectionString = selection?.toString();

  if (selectionString) {
    chrome.runtime.sendMessage({ action: 'hight' });
  }
}

function initializeHighterCursor() {
  document.addEventListener('mouseup', hightOnSelection);
}

function toggleHighterCursor() {
  showHighterCursor = !showHighterCursor;

  if (showHighterCursor) {
    document.body.style.cursor = `url(
      data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJySURBVEiJtZRdSFNhGMd/02I7Osg229x0hui2WlproEmGZMUuvIkkyMu6KOuqiwgKKoqkuvFWyCAChUyIvAhDpW76QKxsmX0oLMj83PyYbXqksLcLz+T4cTF21h9eOO/zvPz+5+V53iedFMvl8bYtLYncRXm+ByAtlXBbXsFdk8V+3JRttsRjmzQyJb1B+p5tsS3p9dJf/9HarUW7ynSNty9oxKpkMBgqd5T4Rl4MzIreYSGeBebE9Ybm/alzACRJKnPu3D3S+SEkmp68E97SyvPxXEpqIMty74/gN/+5E1UjwcGP/Jqbsm50rg54D9QATqALaFFyDUA3UKGsbiWGcqYLKAKcVnv+gmO782YcqlMZnAY+A/2AO8nLDAJbAQkYWmsAgLQl81Kh13nRZDP/TpQqdLq06cmoaexLsD4yMXVDnVO3aS0wpNdv1h86WW1y7/Mk/NtCwED/JG/uPxqNTEz5ABfQCquLnAOYEqaukd6YgTnPGlYYOfG42qADCCRrEAr+5OurwAGF0bGRwX+R2qAa8Bb63M9zXQ4tTK/CWmcwAcyER0O2xdiCFoMZYDy+UXdRK0B4OORvu9UybbaZ/iRKjLfpYlSOAX3KAla/AxcgA7Noe2h7AA9wb1XGUeCut9rzF1geE0UkNypqWB43Z9ZZWyy5V681NIsSX0U0Iytrb5I3WKeVIkuZxjG3p5g7TY+NTmfxa4vdntqZfqrusufl4Lx4OyxEZ2Ba+MqrZKs1/4hW7koXPW1/cKz04GE+9fVEO9sfRoQOY2w+0go4WC6+Nm2z2q6UV/pli93RqBmmUvrKl46SWCwaCo+PnE2lwT+ogMWl2foelQAAAABJRU5ErkJggg==
    ), auto`;

    hightOnSelection();
  } else {
    document.body.style.cursor = 'default';
  }
}

function getShowHighterCursor() {
  return showHighterCursor;
}

export { initializeHighterCursor, toggleHighterCursor, getShowHighterCursor };
