import type { SwiperOptions } from 'swiper/types';
import Swiper from 'swiper';

const SWIPER_SELECTOR = '.swiper';
const SWIPER_PREV_BUTTON_SELECTOR = '.swiper-button-prev';
const SWIPER_NEXT_BUTTON_SELECTOR = '.swiper-button-next';
const SWIPER_PAGINATION_SELECTOR = '.swiper-pagination';

export function initSwiper(element: HTMLElement, options: SwiperOptions) {
  const swiperElement = element.querySelector<HTMLElement>(SWIPER_SELECTOR);
  if (!swiperElement)
    return null;
  const prevEl = element.querySelector<HTMLElement>(SWIPER_PREV_BUTTON_SELECTOR);
  const nextEl = element.querySelector<HTMLElement>(SWIPER_NEXT_BUTTON_SELECTOR);
  if (prevEl && nextEl) {
    options = {
      ...options,
      navigation: {
        prevEl,
        nextEl,
      },
    };
  }
  const paginationElement = element.querySelector<HTMLElement>(SWIPER_PAGINATION_SELECTOR);
  if (paginationElement) {
    options = {
      ...options,
      pagination: typeof options.pagination === 'boolean'
        ? options.pagination
        : {
            ...options.pagination,
            el: paginationElement,
          },
    };
  }
  return new Swiper(swiperElement, options);
}
