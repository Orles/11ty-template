import type { SwiperOptions } from 'swiper/types';
import { initSwiper } from './swiper';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';

const CAROUSEL_SELECTOR = '.js-carousel';
const THUMBS_CAROUSEL_SELECTOR = '.js-thumbs-carousel';
const MAIN_CAROUSEL_SELECTOR = '.js-thumbs-carousel__main';
const GALLERY_CAROUSEL_SELECTOR = '.js-thumbs-carousel__gallery';

const SWIPER_OPTIONS: Record<string, SwiperOptions> = {
  default: {
    modules: [Navigation, Pagination],
    slidesPerView: 4,
    spaceBetween: 20,
    loop: true,
    pagination: {
      clickable: true,
    },
  },
  gallery: {
    modules: [Navigation],
    slidesPerView: 4,
    spaceBetween: 20,
  },
  thumbs: {
    modules: [Navigation, Thumbs],
    spaceBetween: 10,
  },
  productMain: {
    modules: [Thumbs, Navigation],
    slidesPerView: 1,
    spaceBetween: 20,
    watchSlidesProgress: true,
  },
  productGallery: {
    slidesPerView: 4,
    spaceBetween: 8,
  },
};

const carouselElements =
  document.querySelectorAll<HTMLElement>(CAROUSEL_SELECTOR);
const thumbsCarouselElements = document.querySelectorAll<HTMLElement>(
  THUMBS_CAROUSEL_SELECTOR,
);

function getSwiperOptions(name: string) {
  return {
    ...SWIPER_OPTIONS[name],
  };
}

function initCarousel(element: HTMLElement) {
  initSwiper(
    element,
    getSwiperOptions(element.dataset.carouselName ?? 'default'),
  );
}

function initCarousels() {
  for (const carouselElement of carouselElements) {
    initCarousel(carouselElement);
  }
}

function initThumbsCarousel(element: HTMLElement) {
  const galleryCarouselElement = element.querySelector<HTMLElement>(
    GALLERY_CAROUSEL_SELECTOR,
  );
  const mainCarouselElement = element.querySelector<HTMLElement>(
    MAIN_CAROUSEL_SELECTOR,
  );
  if (!galleryCarouselElement || !mainCarouselElement) return;
  const gallerySwiper = initSwiper(
    galleryCarouselElement,
    getSwiperOptions('gallery'),
  );
  initSwiper(mainCarouselElement, {
    ...getSwiperOptions('thumbs'),
    thumbs: {
      swiper: gallerySwiper,
    },
  });
}

function initThumbsCarousels() {
  for (const thumbsCarouselElement of thumbsCarouselElements) {
    initThumbsCarousel(thumbsCarouselElement);
  }
}

function initProductCarousel() {
  const galleryCarouselElement = document.querySelector<HTMLElement>(
    '.js-product-gallery-carousel',
  );
  const mainCarouselElement = document.querySelector<HTMLElement>(
    '.js-product-main-carousel',
  );
  if (!galleryCarouselElement || !mainCarouselElement) return;
  initSwiper(mainCarouselElement, {
    ...getSwiperOptions('productMain'),
    thumbs: {
      swiper: initSwiper(
        galleryCarouselElement,
        getSwiperOptions('productGallery'),
      ),
    },
  });
}

export { initCarousels, initProductCarousel, initThumbsCarousels };
