// core
import Inputmask from 'inputmask';
// styles
import './form.scss';

const telMask = new Inputmask('+7(999)999-99-99');

const form = {
  el: '.form',
  tel: 'input[name=phone]',
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
    const forms = document.querySelectorAll(this.el);
    if (forms) {
      forms.forEach((elm) => {
        const tel = elm.querySelector(this.tel);
        if (tel) telMask.mask(tel);

        this.listener(elm.querySelectorAll('.form-input'));
      });
    }
  },
};

export default form;
