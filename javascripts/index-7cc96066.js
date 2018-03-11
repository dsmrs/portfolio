// import Reveal from 'reveal.js';
import $ from 'jquery';
import 'bootstrap';
import { init } from './slider';
// Reveal.initialize({ transition: 'zoom' });
const toggle = $('[data-toggle="tooltip"]');
console.log(toggle);
toggle.tooltip();
init();
