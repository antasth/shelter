import './global.scss';
import './index.html';
import App from './components/app/app';

// window.addEventListener('DOMContentLoaded', () => {
//     const slider = new Slider('.page', '.next');
//     slider.render();
// });

const app = new App();
app.start();
