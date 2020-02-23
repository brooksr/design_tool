import {blocks} from './blocks.js';
import {email} from './email.js';
import {email2} from './email2.js';
import {modal} from './modal.js';
import {bar} from './bar.js';
import {uml} from './uml.js';
import {uml_export} from './uml_export.js';

export let config = {
  node: document.getElementById("design_tool"),
  templates: [
    {
      html: email,
      name: "Email 1",
      icon: '<i class="far fa-envelope"></i>'
    },{
      html: email2,
      name: "Email 2",
      icon: '<i class="far fa-envelope"></i>'
    },{
      html: modal,
      name: "Modal 1",
      icon: '<i class="far fa-square"></i>'
    },{
      html: bar,
      name: "bar 1",
      icon: '<i class="fas fa-square"></i>'
    },{
      html: uml,
      name: "uml 1",
      icon: '<i class="fas fa-html5"></i>'
    },{
      html: uml_export,
      name: "uml_export",
      icon: '<i class="fas fa-html5"></i>'
    }
  ],
  blocks: [{
    "name": "Modal blocks",
    "blocks": blocks
  }],
  images: [
    "https://via.placeholder.com/600x50?text=LOGO",
    "https://via.placeholder.com/50x50?text=1",
    "https://via.placeholder.com/250x250?text2",
    "https://via.placeholder.com/50x300?text=3",
    "https://via.placeholder.com/50x50?text=4",
  ],
  styles: {
    "display-font": "Lobster",
    "text-font": "Roboto",
    "main-bg-color": "hsl(0, 0%, 95%)",
    "main-font-color": "hsl(0, 0%, 5%)",
    "primary-color": "hsl(210, 100%, 56%)",
    "primary-color-dark": "hsl(210, 100%, 46%)",
    "primary-color-text": "hsl(0, 0%, 98%)",
    "overlay-color": "hsla(0, 0%, 0%, 0.5)"
  }
};
