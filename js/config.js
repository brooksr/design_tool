import * as modalBlocks from './modal-blocks.js';
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
      rules: {
        lift_test: 0.90,
        languages: ["en"],
        locales: ["us"],
        pages: ["home"],
        stages: ["active_cart"],
        visitors: ["new"],
        notes: "",
      },
      features: {
        other: ["cart_rebuilder", "coupon_reminder"],
        coupon: {
          source: "SAVE10",
          expiration: "2020-12-31",
          apply: "Only from email"
        },
        notes: "",
      },
      admin: {
        site_id: "23456",
        tracking: "https://www.example.com?url=",
        sale_window: 86400 * 30,
        opp: "https://upsellit.lightning.force.com/lightning/r/Opportunity/0060g000010TmmNAAS/view",
        design_notes: "This is an area for design notes and feedback. Add links to client references and assets.",
        dev_notes: "Notes for the development team. Comments on specific functionality.",
        qa_notes: "Notes for QA. Links to QA docs.",
      },
      modal: [{
        name: "Lead Capture",
        html: modal,
        split: "",
        launch_method: "abandonment",
        launch_settings: 6,
        link: "https://www.destination.com/cart",
        notes: "",
      },{
        name: "Coupon reminder",
        html: bar,
        notes: "",
      }],
      email: [{
        name: "Email 1",
        time: 3600,
        html: uml_export,
        link: "https://www.destination.com/cart",
        notes: "",
      },{
        name: "Email 2",
        time: 86400 - 3600,
        html: email,
        link: "https://www.destination.com/cart",
        notes: "",
      },{
        name: "Email 3",
        time: 86400 * 2,
        html: email2,
        link: "https://www.destination.com/cart",
        notes: "",
      }]
    },
    {
      name: "Precise Promotion | Free Shipping",
      desc: "Example description here.",
      opp: "https://upsellit.lightning.force.com/lightning/r/Opportunity/0060g000010TmmNAAS/view",
      modal: [{
        name: "FS",
        html: modal,
        split: "",
        launch_method: "abandonment",
        launch_settings: 6,
        link: "https://www.destination.com/cart",
        notes: "",
      }]
    }
  ],
  templates: [{
    html: modal,
    name: "Modal 1",
    icon: '<i class="fas fa-ad"></i>'
  },{
    html: email,
    name: "Email 1",
    icon: '<i class="far fa-envelope"></i>'
  },{
    html: email2,
    name: "Email 2",
    icon: '<i class="far fa-envelope"></i>'
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
    name: "Modal blocks",
    blocks: modalBlocks
  },{
    name: "Email blocks",
    blocks: emailBlocks
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
    path: "./fonts/SamsungSansRegular-webfont"
  },{
    name: "SamsungSansSharp",
    path: "./fonts/SamsungSharpSans-Medium"
  }],
  styles: {
    "display-font": "SamsungSansSharp",
    "text-font": "SamsungSansRegular",
    "main-bg-color": "hsl(0, 0, 0)",
    "main-font-color": "hsl(0, 0%, 98%)",
    "primary-color": "hsl(231, 78%, 35%)",
    "primary-color-dark": "hsl(231, 78%, 30%)",
    "primary-color-text": "hsl(0, 0%, 98%)",
    "overlay-color": "hsla(0, 0%, 0%, 0.5)"
  }
};