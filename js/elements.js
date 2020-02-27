let global = {
  "class": "-?[_a-zA-Z]+[_-a-zA-Z0-9]*",
  "id": "^[a-zA-Z][\\w:.\\-_]*$",
  "aria-label": ".*",
  /*"tabindex": {"values": [0, -1]},
  "aria-modal": {"values": [true, false]},
  "title": ".*",
  "role": {
    "values": [
      "dialog",
      "alertdialog"
    ]
  },*/
};

const elements = {
  "body": {
    "draggable": false,
    "attributes": global
  },
  "blockquote": {
    "droppable": false,
    "attributes": {
      ...global,
      "cite": ".*"
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
      "reversed": "true|false",
      "start": Number,
      //"type": "1"
    },
  },
  "ul": {
    "droppable": "li",
    "attributes": global
  },
  "li": {
    "attributes": {
      ...global,
      //"value": ".*"
    },
  },
  "p": {
    "attributes": global
  },
  "a": {
    "attributes": {
      ...global,
      "href": ".*",
      "target": ".*"
      /*"ping": ".*",
      "download": ".*",*/
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
      "autoplay": ".*",
      "buffered": ".*",
      "controls": ".*",
      "crossorigin": ".*",
      "currentTime": ".*",
      "duration": ".*",
      "height": ".*",
      "loop": ".*",
      "muted": ".*",
      "playsinline": ".*",
      "poster": ".*",
      "preload": ".*",
      "src": ".*",
      "width": ".*"
    },
  },
  "img": {
    "selfClosing": true,
    "droppable": false,
    "attributes": {
      ...global,
      "src": ".*",
      "alt": ".*",
      /*"crossorigin": ".*",
      "decoding": ".*",
      "height": ".*",
      "sizes": ".*",
      "srcset": ".*",
      "width": ".*"*/
    },
  },
  "iframe": {
    "selfClosing": true,
    "droppable": false,
    "attributes": {
      ...global,
      "src": ".*",
      "title": ".*",
      /*"allow": ".*",
      "height": ".*",
      "name": ".*",
      "referrerpolicy": ".*",
      "sandbox": ".*",
      "srcdoc": ".*",
      "width": ".*"*/
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
      "colspan": ".*",
      "headers": ".*",
      "rowspan": ".*",
      "scope": ".*"
    },
  },
  "td": {
    "attributes": {
      ...global,
      "colspan": ".*",
      "headers": ".*",
      "rowspan": ".*",
      "scope": ".*"
    },
  },
  "button": {
    "droppable": false,
    "attributes": {
      ...global,
      "name": ".*",
      "type": ".*",
      "value": ".*"
      /*"autofocus": ".*",
      "disabled": ".*",*/
    },
  },
  "form": {
    "attributes": {
      ...global,
      "action": ".*",
      "autocomplete": ".*",
      "method": ".*",
      "novalidate": ".*",
      "target": ".*"
    },
  },
  "input": {
    "selfClosing": true,
    "droppable": false,
    "attributes": {
      ...global,
      "name": ".*",
      "type": ".*",
      "value": ".*",
      "checked": "true|false",
      "placeholder": ".*",
      "pattern": ".*",
      "required": "true|false",
      /*"autofocus": ".*",
      "autocomplete": ".*",
      "accept": ".*",
      "alt": ".*",
      "capture": ".*",
      "dirname": ".*",
      "disabled": ".*",
      "form": ".*",
      "formaction": ".*",
      "formenctype": ".*",
      "formmethod": ".*",
      "formnovalidate": ".*",
      "formtarget": ".*",
      "height": ".*",
      "list": ".*",
      "max": ".*",
      "maxlength": ".*",
      "min": ".*",
      "minlength": ".*",
      "multiple": ".*",
      "readonly": ".*",
      "size": ".*",
      "src": ".*",
      "step": ".*",
      "width": ".*"*/
    },
  },
  "label": {
    "attributes": {
      ...global,
      "for": ".*"
    },
  },
  "select": {
    "droppable": "option",
    "attributes": {
      ...global,
      "name": ".*",
      "required": "true|false",
      /*"autocomplete": ".*",
      "autofocus": ".*",
      "disabled": ".*",
      "multiple": ".*",
      "size": ".*"*/
    },
  },
  "option": {
    "droppable": false,
    "draggable": false,
    "attributes": {
      ...global,
      "selected": ".*",
      "value": ".*"
      /*"disabled": ".*",
      "label": ".*",*/
    },
  },
  "textarea": {
    "droppable": false,
    "attributes": {
      ...global,
      "name": ".*",
      "required": "true|false",
      /*"autocomplete": ".*",
      "autofocus": ".*",
      "cols": ".*",
      "disabled": ".*",
      "maxlength": ".*",
      "minlength": ".*",
      "readonly": ".*",
      "rows": ".*",
      "spellcheck": ".*",
      "wrap": ".*"*/
    },
  },
};
export default elements;