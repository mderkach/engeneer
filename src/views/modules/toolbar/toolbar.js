// style
import './toolbar.scss';

const toolbar = {
  trigger: document.querySelector('.hamburger'),
  submenuTrigger: document.querySelector('.toolbar').querySelectorAll('.toolbar__item-descr'),
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
      });
    }

    this.enableMobileMenu();

    window.addEventListener('resize', () => {
      this.enableMobileMenu();
    });
  },
};
export default toolbar;
