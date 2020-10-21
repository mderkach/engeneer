/* eslint-disable no-unused-vars */
// js, scss of components
import breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import screenProjects from '../../components/screen/screenProjects';
import screenAlso from '../../components/screen/screenAlso';
import sliderFluid from '../../components/slider/sliderFluid';
import fluid from '../../components/fluid/fluid';
import screenConsult from '../../components/screen/screenConsult';
// page styles
import './implement.scss';
// page js
const implement = {
  accordion: document.querySelector('.implement__accordion'),
  getLineHeight(elm) {
    const lineHeight = window.getComputedStyle(elm)['line-height'];
    if (lineHeight === 'normal') {
      // fuck chrome
      console.log('fuck');
      return 1.16 * parseFloat(window.getComputedStyle(elm)['font-size']);
    }
    return parseFloat(lineHeight);
  },
  truncateText(elm) {
    const truncateTextParts = elm.textContent.split(' ');
    const lineHeight = this.getLineHeight(elm);

    while (2 * lineHeight < elm.clientHeight) {
      truncateTextParts.pop();
      const truncated = elm;
      truncated.textContent = `${truncateTextParts.join(' ')}...`;
    }
  },
  init() {
    if (this.accordion) {
      const trigger = this.accordion.querySelector('.implement__accordion_trigger');
      const toTruncate = this.accordion.querySelector('p');
      const truncateText = toTruncate.textContent;

      this.truncateText(toTruncate);

      trigger.addEventListener('click', () => {
        this.accordion.classList.toggle('is-collapsed');
        if (this.accordion.classList.contains('is-collapsed')) {
          this.truncateText(toTruncate);
        } else {
          toTruncate.textContent = truncateText;
        }
      });
    }
  },
};
// init js and components
implement.init();
sliderFluid.init();
screenProjects.init();
screenConsult.init();
