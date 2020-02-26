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
      desc: "Summary of campaign. Info about site IDs, coupon types/expiration/application. Tracking, sale window, links. Launch method, launch settings. Lift tests and split tests. Engagement rules. Design requests and languages. Extra features (cart rebuilder, boost bar). Email send times. Links for assets, copy, reference. QA & dev notes. Testing instructions.",
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
