import { removeHightEventListeners } from '../hover';
import { update as updateStorage } from '../storage';
import { DELETED_CLASS, HIGHTED_CLASS } from '../utils/constants';

function remove(hightId: number) {
  const hights = $(`.${HIGHTED_CLASS}[data-hight-id='${hightId}']`);
  $('.hight-hovered').removeClass('hight-hovered');

  hights.css('backgroundColor', 'inherit');
  hights.css('color', 'inherit');
  hights.removeClass(HIGHTED_CLASS).addClass(DELETED_CLASS);
  updateStorage(
    hightId,
    window.location.hostname + window.location.pathname,
    window.location.pathname,
    'inherit',
    'inherit',
  );

  hights.each((_, el) => {
    removeHightEventListeners(el);
  });
}

export default remove;
