// core
import GLightbox from 'glightbox';
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
  init() {
    if (this.lightboxElTrigg) {
      form.el = this.modal;
      const inlined = document.querySelector(this.modal);
      this.lightbox.on('open', () => {
        inlined.style.display = 'flex';
      });
      this.lightbox.on('close', () => {
        inlined.style.display = 'none';
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
export default header;
