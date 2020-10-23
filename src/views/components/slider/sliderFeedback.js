import { Swiper, Pagination } from 'swiper';
import './sliderFeedback.scss';

Swiper.use([Pagination]);

const sliderFeedback = {
  el: document.querySelector('.slider-feedback'),
  constructor: () => {
    return new Swiper(sliderFeedback.el, sliderFeedback.opts);
  },
  opts: {
    speed: 400,
    wrapperClass: 'slider-feedback-wrapper',
    slideClass: 'slider-feedback-slide',
    slidesPerView: 1,
    pagination: {
      el: '.slider-feedback-pagination',
      type: 'bullets',
      bulletElement: 'div',
      bulletClass: 'slider-feedback-bullet',
      bulletActiveClass: 'is-active',
      hiddenClass: 'is-hidden',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
      },
      992: {
        spaceBetween: 60,
        slidesPerView: 3,
      },
    },
  },
  init() {
    if (this.el) {
      this.constructor();
    }
  },
};

export default sliderFeedback;
