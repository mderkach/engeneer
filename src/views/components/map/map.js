/* eslint-disable no-unused-vars */
import ymaps from 'ymaps';
import './map.scss';

const pinCoords = [55.847219568883766, 37.65628949999989];
const mapCenter = [55.847219568883766, 37.65628949999989];

const map = {
  el: document.querySelector('.map'),
  init() {
    if (map.el) {
      ymaps
        .load()
        .then((maps) => {
          const mapObj = new maps.Map(map.el, {
            center: mapCenter,
            zoom: 17,
          });
          const pin = new maps.Placemark(pinCoords, {});
          mapObj.geoObjects.add(pin);
        })
        .catch((error) => console.log('Failed to load Yandex Maps', error));
    }
  },
};

export default map;
