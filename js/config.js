import {blocks} from './blocks.js';
import {email} from './email.js';
import {email2} from './email2.js';
import {modal} from './modal.js';
import {bar} from './bar.js';
import {uml} from './uml.js';
import {uml_export} from './uml_export.js';

export let config = {
  node: document.getElementById("design_tool"),
  units: ["px", "%", "em", "vmax", "vmin", "vh", "vw", "none"],
  template: localStorage.getItem("editor-01") ? decodeURIComponent(localStorage.getItem("editor-01")) : uml,
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
  blocks: blocks,
  images: [
    "https://via.placeholder.com/600x50?text=LOGO",
    "https://via.placeholder.com/50x50?text=1",
    "https://via.placeholder.com/250x250?text2",
    "https://via.placeholder.com/50x300?text=3",
    "https://via.placeholder.com/50x50?text=4",
  ]
};