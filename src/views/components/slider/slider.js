import { Swiper, Pagination } from 'swiper';
import './slider.scss';

Swiper.use([Pagination]);

const slider = {
  el: document.querySelector('.slider'),
  constructor: () => {
    return new Swiper(slider.el, slider.opts);
  },
  opts: {
    speed: 400,
    wrapperClass: 'slider-wrapper',
    slideClass: 'slider-slide',
    slidesPerView: 1,
    pagination: {
      el: '.slider-pagination',
      type: 'bullets',
      bulletElement: 'div',
      bulletClass: 'slider-bullet',
      bulletActiveClass: 'is-active',
      hiddenClass: 'is-hidden',
      clickable: true,
    },
  },
  init() {
    if (this.el) {
      this.constructor();
    }
  },
};

export default slider;
