function show(hightId: string | number) {
  const hightEl = document.querySelector(`[data-hight-id="${hightId}"]`);
  if (hightEl) {
    hightEl.scrollIntoView(true);
  }
}

export default show;
