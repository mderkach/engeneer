import { Swiper, Pagination } from 'swiper';
import './sliderFluid.scss';

Swiper.use([Pagination]);

const sliderFluid = {
  el: document.querySelectorAll('.slider-fluid'),
  constructor: () => {
    sliderFluid.el.forEach((slider) => {
      return new Swiper(slider, sliderFluid.opts);
    });
  },
  opts: {
    speed: 400,
    wrapperClass: 'slider-fluid-wrapper',
    slideClass: 'slider-fluid-slide',
    slidesPerView: 1,
    pagination: {
      el: '.slider-fluid-pagination',
      type: 'bullets',
      bulletElement: 'div',
      bulletClass: 'slider-fluid-bullet',
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

export default sliderFluid;
