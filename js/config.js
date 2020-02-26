import {modalBlocks} from './modal-blocks.js';
import {emailBlocks} from './email-blocks.js';

import {email} from './templates/email.js';
import {email2} from './templates/email2.js';
import {modal} from './templates/modal.js';
import {bar} from './templates/bar.js';
import {uml} from './templates/uml.js';
import {uml_export} from './templates/uml_export.js';

export let config = {
  campaigns: [
    {
      name: "Inboxed Incentive | Save Your Cart",
      desc: "Summary of campaign. Testing instructions.",
      admin: {
        site_id: "23456",
        tracking: "https://www.example.com?url=",
        sale_window: 86400 * 30,
        opp: "https://upsellit.lightning.force.com/lightning/r/Opportunity/0060g000010TmmNAAS/view",
        notes: {
          design: "This is an area for design notes and feedback. Add links to client references and assets.",
          dev: "Notes for the development team. Comments on specific functionality.",
          qa: "Notes for QA. Links to QA docs.",
        },
      },
      features: {
        other: ["cart_rebuilder", "coupon_reminder"],
        coupon: {
          source: "SAVE10",
          expiration: "2020-12-31",
          apply: "Only from email"
        }
      },
      rules: {
        launch_method: "abandonment",
        launch_settings: 6,
        lift_test: 0.90,
        languages: ["en"],
        locales: ["us"],
        pages: ["home"],
        stages: ["active_cart"],
        visitors: ["new"],
      },
      modal: [{
        name: "Lead Capture",
        html: modal,
        split: "",
        link: "https://www.destination.com/cart",
      },{
        name: "Coupon reminder",
        html: bar
      }],
      email: [{
        name: "Email 1",
        time: 3600,
        html: uml_export,
        link: "https://www.destination.com/cart",
      },{
        name: "Email 2",
        time: 86400 - 3600,
        html: email,
        link: "https://www.destination.com/cart",
      },{
        name: "Email 3",
        time: 86400 * 2,
        html: email2,
        link: "https://www.destination.com/cart",
      }]
    },{
      name: "Precise Promotion | Free Shipping",
      desc: "Example description here.",
      opp: "https://upsellit.lightning.force.com/lightning/r/Opportunity/0060g000010TmmNAAS/view",
      modal: [{
        name: "FS",
        html: modal,
        link: "https://www.destination.com/cart",
      }]
    }
  ],
  templates: [{
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
    icon: '<i class="fas fa-ad"></i>'
  },{
    html: bar,
    name: "bar 1",
    icon: '<i class="fas fa-ad"></i>'
  },{
    html: uml,
    name: "uml 1",
    icon: '<i class="fab fa-html5"></i>'
  },{
    html: uml_export,
    name: "uml_export",
    icon: '<i class="fab fa-html5"></i>'
  }],
  blocks: [{
    "name": "Modal modalBlocks",
    "blocks": modalBlocks
  },{
    "name": "Email modalBlocks",
    "blocks": emailBlocks
  }],
  images: [
    "https://via.placeholder.com/600x50?text=LOGO",
    "https://via.placeholder.com/50x50?text=1",
    "https://via.placeholder.com/250x250?text2",
    "https://via.placeholder.com/50x300?text=3",
    "https://via.placeholder.com/50x50?text=4",
  ],
  fonts: [{
    name: "SamsungSansRegular",
    path: "/fonts/SamsungSansRegular-webfont"
  }],
  styles: {
    "display-font": "SamsungSansRegular",
    "text-font": "SamsungSansRegular",
    "main-bg-color": "hsl(0, 0%, 100%)",
    "main-font-color": "hsl(0, 0%, 20%)",
    "primary-color": "hsl(231, 78%, 35%)",
    "primary-color-dark": "hsl(231, 78%, 30%)",
    "primary-color-text": "hsl(0, 0%, 98%)",
    "overlay-color": "hsla(0, 0%, 0%, 0.5)"
  }
};
