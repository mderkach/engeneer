// example of thank you modal after submit

import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.min.css';

const modalOpts = {
  elements: [
    {
      content:
        '<h2 class="h2 medium" style="text-align: center">Спасибо за зявку!</h2> <p class="text-regular" style="text-align: center">Мы свяжемся с вами в ближайшее время</p> ',
    },
  ],
  width: '80%',
  height: 'auto',
};

const modal = GLightbox(modalOpts);

document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    modal.open();
  });
});
