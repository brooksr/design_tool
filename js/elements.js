let global = {
  "class": "",
  "id": "",
  "tabindex": {"values": [0, -1]},
  "title": "",
  "role": {
    "values": [
      "dialog",
      "alertdialog"
    ]
  },
  "aria-label": "",
  "aria-modal": {"values": [true, false]}
};
export const elements = {
  /*"body": {
    "draggable": false,
    "attributes": global
  },*/
  "blockquote": {
    "droppable": false,
    "attributes": {
      ...global,
      "cite": ""
    },
  },
  "div": {
    "attributes": global
  },
  "h1": {
    "attributes": global
  },
  "hr": {
    "selfClosing": true,
    "droppable": false,
    "attributes": global
  },
  "ol": {
    "droppable": "li",
    "attributes": {
      ...global,
      "reversed": false,
      "start": 1,
      "type": 1
    },
  },
  "ul": {
    "droppable": "li",
    "attributes": global
  },
  "li": {
    "attributes": {
      ...global,
      "value": ""
    },
  },
  "p": {
    "attributes": global
  },
  "a": {
    "attributes": {
      ...global,
      "download": "",
      "href": "",
      "ping": "",
      "target": ""
    },
  },
  "br": {
    "selfClosing": true,
    "droppable": false,
    "draggable": false,
    "attributes": global
  },
  "em": {
    "droppable": false,
    "draggable": false,
    "attributes": global
  },
  "small": {
    "droppable": false,
    "draggable": false,
    "attributes": global
  },
  "span": {
    "attributes": global
  },
  "strong": {
    "droppable": false,
    "draggable": false,
    "attributes": global
  },
  "video": {
    "droppable": false,
    "attributes": {
      ...global,
      "autoplay": "",
      "buffered": "",
      "controls": "",
      "crossorigin": "",
      "currentTime": "",
      "duration": "",
      "height": "",
      "loop": "",
      "muted": "",
      "playsinline": "",
      "poster": "",
      "preload": "",
      "src": "",
      "width": ""
    },
  },
  "img": {
    "selfClosing": true,
    "droppable": false,
    "attributes": {
      ...global,
      "alt": "",
      "crossorigin": "",
      "decoding": "",
      "height": "",
      "sizes": "",
      "src": "",
      "srcset": "",
      "width": ""
    },
  },
  "iframe": {
    "selfClosing": true,
    "droppable": false,
    "attributes": {
      ...global,
      "allow": "",
      "height": "",
      "name": "",
      "referrerpolicy": "",
      "sandbox": "",
      "src": "",
      "srcdoc": "",
      "width": ""
    },
  },
  "table": {
    "droppable": "tbody, thead, tfoot",
    "attributes": global
  },
  "tbody": {
    "droppable": "tr",
    "draggable": false,
    "attributes": global
  },
  "thead": {
    "droppable": "tr",
    "draggable": false,
    "attributes": global
  },
  "tfoot": {
    "droppable": "tr",
    "draggable": false,
    "attributes": global
  },
  "tr": {
    "droppable": "td, th",
    "attributes": global
  },
  "th": {
    "attributes": {
      ...global,
      "colspan": "",
      "headers": "",
      "rowspan": "",
      "scope": ""
    },
  },
  "td": {
    "attributes": {
      ...global,
      "colspan": "",
      "headers": "",
      "rowspan": "",
      "scope": ""
    },
  },
  "button": {
    "attributes": {
      "autofocus": "",
      "disabled": "",
      "name": "",
      "type": "",
      "value": ""
    },
    ...global
  },
  "form": {
    "attributes": {
      ...global,
      "action": "",
      "autocomplete": "",
      "method": "",
      "novalidate": "",
      "target": ""
    },
  },
  "input": {
    "selfClosing": true,
    "droppable": false,
    "attributes": {
      ...global,
      "accept": "",
      "alt": "",
      "autocomplete": "",
      "autofocus": "",
      "capture": "",
      "checked": "",
      "dirname": "",
      "disabled": "",
      "form": "",
      "formaction": "",
      "formenctype": "",
      "formmethod": "",
      "formnovalidate": "",
      "formtarget": "",
      "height": "",
      "list": "",
      "max": "",
      "maxlength": "",
      "min": "",
      "minlength": "",
      "multiple": "",
      "name": "",
      "pattern": "",
      "placeholder": "",
      "readonly": "",
      "required": "",
      "size": "",
      "src": "",
      "step": "",
      "type": "",
      "value": "",
      "width": ""
    },
  },
  "label": {
    "attributes": {
      ...global,
      "for": ""
    },
  },
  "select": {
    "droppable": "option",
    "attributes": {
      ...global,
      "autocomplete": "",
      "autofocus": "",
      "disabled": "",
      "multiple": "",
      "name": "",
      "required": "",
      "size": ""
    },
  },
  "option": {
    "droppable": false,
    "draggable": false,
    "attributes": {
      ...global,
      "disabled": "",
      "label": "",
      "selected": "",
      "value": ""
    },
  },
  "textarea": {
    "droppable": false,
    "attributes": {
      ...global,
      "autocomplete": "",
      "autofocus": "",
      "cols": "",
      "disabled": "",
      "maxlength": "",
      "minlength": "",
      "name": "",
      "readonly": "",
      "required": "",
      "rows": "",
      "spellcheck": "",
      "wrap": ""
    },
  },
};
