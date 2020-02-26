import {blocks} from './blocks.js';
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
      desc: `Summary of campaign. 
      coupon types/expiration/application. 
      Launch method, launch settings. 
      Lift tests and split tests. 
      Extra features (cart rebuilder, boost bar). 
      Languages and locales
      Engagement rules. `,
      alt: `
      Info about site IDs
      Tracking, sale window, links.
      Design requests. 
      Links for assets, copy, reference. 
      QA & dev notes. 
      Testing instructions. `,
      opp: "https://upsellit.lightning.force.com/lightning/r/Opportunity/0060g000010TmmNAAS/view",
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
          time: 3600,
          html: uml_export
        },{
          name: "Email 2",
          time: 86400 - 3600,
          html: email
        },{
          name: "Email 3",
          time: 86400 * 2,
          html: email2
        }
      ]
    },{
      name: "Precise Promotion | Free Shipping",
      desc: "Example description here.",
      opp: "https://upsellit.lightning.force.com/lightning/r/Opportunity/0060g000010TmmNAAS/view",
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
  fonts: [
    {
      name: "SamsungSansRegular",
      path: "/fonts/SamsungSansRegular-webfont"
    }
  ],
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
