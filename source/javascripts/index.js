import Reveal from 'reveal.js';
import $ from 'jquery';
import 'bootstrap';

console.log("coucou", Reveal);
Reveal.initialize({ transition: 'zoom' });
const toggle = $('[data-toggle="tooltip"]');
console.log(toggle);
toggle.tooltip();
