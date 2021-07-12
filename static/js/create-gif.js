import {navBarComponent} from './nav-bar-component.js';
import {isDarkMode, renderDarkMode} from './api-calls.js';

let navBarComponentDiv = document.getElementById('nav-bar-component');

navBarComponent(navBarComponentDiv);
renderDarkMode(isDarkMode());

