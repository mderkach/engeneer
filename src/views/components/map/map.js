/* eslint-disable no-unused-vars */
import ymaps from 'ymaps';
import './map.scss';

const map = {
  el: document.querySelector('.map'),
  init() {
    if (map.el) {
      ymaps
        .load()
        .then((maps) => {
          const mapObj = new maps.Map(map.el, {
            center: [-8.369326, 115.166023],
            zoom: 7,
          });
        })
        .catch((error) => console.log('Failed to load Yandex Maps', error));
    }
  },
};

export default map;
