const hamburger = {
  el: document.querySelector('.hamburger'),
  init() {
    if (this.el) {
      this.el.addEventListener('click', (e) => {
        e.preventDefault();
        // Toggle class "is-active"

        this.el.classList.toggle('is-active');

        // Do something else, like open/close menu
      });
    }
  },
};

export default hamburger;
