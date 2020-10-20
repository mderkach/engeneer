/* eslint-disable no-unused-vars */
// page styles
import './index.scss';

// js, scss of components
import header from '../../modules/header/header';
import footer from '../../modules/footer/footer';
import toolbar from '../../modules/toolbar/toolbar';
import button from '../../components/button/button';
import screenConsult from '../../components/screen/screenConsult';
import screenPartners from '../../components/screen/screenPartners';
import screenCallback from '../../components/screen/screenCallback';
import screenProjects from '../../components/screen/screenProjects';

// initialise components and modules
screenConsult.init();
screenCallback.init();
screenProjects.init();
