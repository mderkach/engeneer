// core
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.min.css';
import form from '../../components/form/form';
// style
import './header.scss';

const header = {
  modal: '.header-modal-form',
  close: '.header-modal-form-close',
  lightboxElTrigg: document.querySelector('a[href="#callback"]'),
  lightbox: GLightbox({
    selector: 'a[href="#callback"]',
    elements: [
      {
        content: document.querySelector('.header-modal-form'),
        width: 500,
      },
    ],
    closeButton: false,
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
      document.querySelector(this.close).addEventListener('click', (e) => {
        e.preventDefault();

        this.lightbox.close();
      });
    }
  },
};

// example of thank you modal after submit;
const modalOpts = {
  elements: [
    {
      content: document.querySelector('.header-ty'),
    },
  ],
  closeButton: false,
  width: '80%',
  height: 'auto',
};

const modal = GLightbox(modalOpts);
modal.on('open', () => {
  document.querySelector('.header-ty').style.display = 'block';
});

document.querySelector('.header-ty-close').addEventListener('click', (e) => {
  e.preventDefault();

  modal.close();
});

// disable forms submit and show ty instead
document.querySelectorAll('form').forEach((item) => {
  item.addEventListener('submit', (e) => {
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
