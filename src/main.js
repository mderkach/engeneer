/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
// JS
import './js/svg';
// SCSS
import './scss/main.scss';
// components
import header from './views/modules/header/header';
import footer from './views/modules/footer/footer';
import toolbar from './views/modules/toolbar/toolbar';

// disable submitting form, show example TY modal
import './views/components/form/formSubmitAlert';

document.addEventListener(
  'wheel',
  (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
    }
  },
  { passive: false },
);

document.addEventListener(
  'keydown',
  (e) => {
    if (e.key === '+' || e.key === '-') {
      e.preventDefault();
    }
  },
  { passive: false },
);
// init components
toolbar.init();
header.init();
