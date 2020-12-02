// core
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.min.css';
import form from '../../components/form/form';
// style
import './header.scss';

const header = {
  modal: '.header-modal-form',
  lightboxElTrigg: document.querySelector('a[href="#callback"]'),
  lightbox: GLightbox({
    selector: 'a[href="#callback"]',
    elements: [
      {
        content: document.querySelector('.header-modal-form'),
        width: 500,
      },
    ],
  }),
  lightboxOpened: false,
  init() {
    if (this.lightboxElTrigg) {
      form.el = this.modal;
      const inlined = document.querySelector(this.modal);
      this.lightbox.on('open', () => {
        inlined.style.display = 'flex';
        this.lightboxOpened = true;
      });
      this.lightbox.on('close', () => {
        inlined.style.display = 'none';
        this.lightboxOpened = false;
      });
      this.lightbox.once('open', () => {
        form.init();
      });
      this.lightboxElTrigg.addEventListener('click', () => {
        this.lightbox.open();
      });
    }
  },
};

// example of thank you modal after submit;
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

document.querySelectorAll('form').forEach((item) => {
  item.addEventListener('submit', (e) => {
    console.log(header);
    e.preventDefault();
    if (header.lightboxOpened) {
      header.lightboxOpened = false;
      header.lightbox.close();
    }
    setTimeout(() => {
      modal.open();
    }, 550);
  });
});

export default header;
