// core
import Inputmask from 'inputmask';
// styles
import './form.scss';

const telMask = new Inputmask('+7(999)999-99-99');

const form = {
  el: '.form',
  tel: 'input[name=phone]',
  init() {
    const forms = document.querySelectorAll(this.el);
    if (forms) {
      forms.forEach((elm) => {
        const tel = elm.querySelector(this.tel);
        if (tel) telMask.mask(tel);
      });
    }
  },
};

export default form;
