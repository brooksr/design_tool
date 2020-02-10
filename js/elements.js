let global = {
  draggable: true,
  "attributes": {
    "class": "",
    "id": "",
    "tabindex": {values: [0, -1]},
    "title": "",
    "role": {
      values: [
        "dialog",
        "alertdialog"
      ]
    },
    "aria-label": "",
    "aria-modal": {values: [true, false]}
  }
};
export const elements = {
  "body": {
    draggable: false,
    ...global
  },
  "blockquote": {
    droppable: false,
    "attributes": {"cite": ""},
    ...global
  },
  "div": {
    ...global
  },
  "h1": {
    ...global
  },
  "hr": {
    selfClosing: true,
    droppable: false,
    ...global
  },
  "ol": {
    droppable: "li",
    "attributes": {
      "reversed": false,
      "start": 1,
      "type": 1
    },
    ...global
  },
  "ul": {
    droppable: "li",
    ...global
  },
  "li": {
    "attributes": {
      "value": ""
    },
    ...global
  },
  "p": {
    ...global
  },
  "a": {
    "attributes": {
      "download": "",
      "href": "",
      "ping": "",
      "target": ""
    },
    ...global
  },
  "br": {
    selfClosing: true,
    droppable: false,
    draggable: false,
    ...global
  },
  "em": {
    droppable: false,
    draggable: false,
    ...global
  },
  "small": {
    droppable: false,
    draggable: false,
    ...global
  },
  "span": {
    ...global
  },
  "strong": {
    droppable: false,
    draggable: false,
    ...global
  },
  "video": {
    droppable: false,
    "attributes": {
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
    ...global
  },
  "img": {
    selfClosing: true,
    droppable: false,
    "attributes": {
      "alt": "",
      "crossorigin": "",
      "decoding": "",
      "height": "",
      "sizes": "",
      "src": "",
      "srcset": "",
      "width": ""
    },
    ...global
  },
  "iframe": {
    selfClosing: true,
    droppable: false,
    "attributes": {
      "allow": "",
      "height": "",
      "name": "",
      "referrerpolicy": "",
      "sandbox": "",
      "src": "",
      "srcdoc": "",
      "width": ""
    },
    ...global
  },
  "table": {
    droppable: "tbody, thead, tfoot",
    ...global
  },
  "tbody": {
    droppable: "tr",
    draggable: false,
    ...global
  },
  "thead": {
    droppable: "tr",
    draggable: false,
    ...global
  },
  "tfoot": {
    droppable: "tr",
    draggable: false,
    ...global
  },
  "tr": {},
  "th": {
    droppable: "tr",
    "attributes": {
      "colspan": "",
      "headers": "",
      "rowspan": "",
      "scope": ""
    },
    ...global
  },
  "td": {
    droppable: "tr",
    "attributes": {
      "colspan": "",
      "headers": "",
      "rowspan": "",
      "scope": ""
    },
    ...global
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
      "action": "",
      "autocomplete": "",
      "method": "",
      "novalidate": "",
      "target": ""
    },
    ...global
  },
  "input": {
    selfClosing: true,
    droppable: false,
    "attributes": {
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
    ...global
  },
  "label": {
    "attributes": {
      "for": ""
    },
    ...global
  },
  "select": {
    droppable: "option",
    "attributes": {
      "autocomplete": "",
      "autofocus": "",
      "disabled": "",
      "multiple": "",
      "name": "",
      "required": "",
      "size": ""
    },
    ...global
  },
  "option": {
    droppable: false,
    draggable: false,
    "attributes": {
      "disabled": "",
      "label": "",
      "selected": "",
      "value": ""
    },
    ...global
  },
  "textarea": {
    droppable: false,
    "attributes": {
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
    ...global
  },
};
