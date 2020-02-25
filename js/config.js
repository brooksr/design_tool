import {blocks} from './blocks.js';
import {emailBlocks} from './emailBlocks.js';
import {email} from './email.js';
import {email2} from './email2.js';
import {modal} from './modal.js';
import {bar} from './bar.js';
import {uml} from './uml.js';
import {uml_export} from './uml_export.js';

export let config = {
  campaigns: [
    {
      name: "Inboxed Incentive | Save Your Cart",
      desc: "Example description here.",
      modal: [
        {
          name: "Lead Capture",
          html: modal
        },{
          name: "Coupon reminder",
          html: bar
        }
      ],
      email: [
        {
          name: "Email 1",
          html: uml_export
        },{
          name: "Email 2",
          html: email
        },{
          name: "Email 3",
          html: email2
        }
      ]
    },{
      name: "Precise Promotion | Free Shipping",
      desc: "Example description here.",
      modal: [
        {
          name: "FS",
          html: modal
        }
      ]
    }
  ],
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
  },{
    "name": "Email blocks",
    "blocks": emailBlocks
  }],
  images: [
    "https://via.placeholder.com/600x50?text=LOGO",
    "https://via.placeholder.com/50x50?text=1",
    "https://via.placeholder.com/250x250?text2",
    "https://via.placeholder.com/50x300?text=3",
    "https://via.placeholder.com/50x50?text=4",
  ],
  styles: {
    "display-font": "Roboto",
    "text-font": "Roboto",
    "main-bg-color": "hsl(0, 0%, 100%)",
    "main-font-color": "hsl(0, 0%, 20%)",
    "primary-color": "hsl(231, 78%, 35%)",
    "primary-color-dark": "hsl(231, 78%, 25%)",
    "primary-color-text": "hsl(0, 0%, 98%)",
    "overlay-color": "hsla(0, 0%, 0%, 0.5)"
  }
};
