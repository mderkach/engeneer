// style
import './toolbar.scss';

const toolbar = {
  trigger: document.querySelector('.hamburger'),
  submenuTrigger: document.querySelector('.toolbar').querySelectorAll('.toolbar__item-descr'),
  search: document.querySelector('.toolbar__item.is-search'),
  searchToggle(item) {
    item.classList.toggle('is-active');
    if (item.classList.contains('is-active')) {
      item.querySelector('input').focus();
    } else {
      item.querySelector('input').blur();
    }
  },
  enableMobileMenu() {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

    if (vw <= 576) {
      this.submenuTrigger.forEach((link) => {
        if (link.nextSibling) {
          link.addEventListener('click', (e) => {
            e.preventDefault();

            link.parentElement.classList.toggle('is-active');
          });
        }
      });
    }
  },
  init() {
    if (this.trigger) {
      this.trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.trigger.classList.toggle('is-active');
        document.querySelector('.toolbar').classList.toggle('is-active');
      });
    }

    if (this.search) {
      this.search.addEventListener('click', (e) => {
        e.preventDefault();

        this.searchToggle(this.search);
      });
    }

    this.enableMobileMenu();

    window.addEventListener('resize', () => {
      this.enableMobileMenu();
    });
  },
};
export default toolbar;
