// styles
import './formSearch.scss';

const formSearch = {
  el: document.querySelector('.form-search'),
  input: 'input[name=search]',
  header: document.querySelector('#search-header'),
  resultText: document.querySelector('.form-search__results'),
  resultWrapper: document.querySelector('#search-result'),
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
  onSubmit() {
    this.el.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = this.el.querySelector(this.input);
      input.setAttribute('placeholder', `Вы искали: ${input.value}`);
      input.value = '';

      this.resultText.style.display = 'block';
      this.resultText.querySelector(
        'span',
      ).textContent = ` ${this.resultWrapper.childNodes.length} `;
      this.header.textContent = 'Результат поиска по запросу';
      this.resultWrapper.classList.add('has-result');
    });
  },
  init() {
    if (this.el) {
      this.listener(this.el.querySelectorAll(this.input));
      this.onSubmit();
    }
  },
};

export default formSearch;
