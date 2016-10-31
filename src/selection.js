
import { select } from 'd3-selection';

export const selectWrapper = selector =>
  selector instanceof window.HTMLElement ?
    selector : document.querySelector(selector)

export const asD3 = el => select(el);

export default selector => asD3(selectWrapper(selector));
