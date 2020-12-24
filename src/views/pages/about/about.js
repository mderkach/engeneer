/* eslint-disable no-unused-vars */
// js, scss of components
import screenConsult from '../../components/screen/screenConsult';
import screenPartners from '../../components/screen/screenPartners';
import screenCallback from '../../components/screen/screenCallback';
import screenProjects from '../../components/screen/screenProjects';
import sliderFeedback from '../../components/slider/sliderFeedback';
import formMessage from '../../components/form/formMessage';

// page styles
import './about.scss';

// initialise components and modules
screenConsult.init();
screenCallback.init();
screenProjects.init();

sliderFeedback.init();
formMessage.init();
