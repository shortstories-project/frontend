!function(){"use strict";var t="https://fonts.googleapis.com/css?family=Alegreya:500,700|Montserrat:400,600|Pacifico",n="__3perf_googleFontsStylesheet";function o(e){(document.head||document.body).appendChild(e)}function e(){var e=document.createElement("link");e.href=t,e.rel="stylesheet",o(e)}function c(e){if(!document.getElementById(n)){var t=document.createElement("style");t.id=n,o(t)}document.getElementById(n).innerHTML=e}window.FontFace&&window.FontFace.prototype.hasOwnProperty("display")?(localStorage[n]&&c(localStorage[n]),fetch(t).then(function(e){return e.text()}).then(function(e){return e.replace(/@font-face {/g,"@font-face{font-display:swap;")}).then(function(e){return localStorage[n]=e}).then(c).catch(e)):e()}();
