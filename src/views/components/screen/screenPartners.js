import GLightbox from 'glightbox';

// styles
import './screenPartners.scss';
import 'glightbox/dist/css/glightbox.min.css';

const screenPartners = {
  certificates: document.querySelectorAll('.certificate'),
  init() {
    if (this.certificates) {
      GLightbox();
    }
  },
};

export default screenPartners;
