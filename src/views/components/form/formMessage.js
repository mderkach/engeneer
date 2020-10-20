// styles
import './formMessage.scss';

const formMessage = {
  el: document.querySelector('.form-message'),
  listener: (arr) => {
    arr.forEach((input) => {
      const placeholder = input.getAttribute('placeholder');
      input.addEventListener('focus', () => {
        input.setAttribute('placeholder', '');
      });
      input.addEventListener('blur', () => {
        input.setAttribute('placeholder', placeholder);
      });
    });
  },
  init() {
    if (this.el) {
      formMessage.listener(this.el.querySelectorAll('.form-message-input'));
    }
  },
};

export default formMessage;
