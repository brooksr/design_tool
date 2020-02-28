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

export const elements = {
  "body": {
    "html": "<body></body>",
    "draggable": false,
    "attributes": global
  },
  "blockquote": {
    "html": "<blockquote>blockquote</blockquote>",
    "droppable": false,
    "attributes": {
      ...global,
      "cite": ".*"
    },
  },
  "div": {
    "html": "<div>div</div>",
    "attributes": global
  },
  "h1": {
    "html": "<h1>H1</h1>",
    "attributes": global
  },
  "hr": {
    "html": "<hr />",
    "selfClosing": true,
    "droppable": false,
    "attributes": global
  },
  "ol": {
    "html": "<ol><li></li></ol>",
    "droppable": "li",
    "attributes": {
      ...global,
      "reversed": "true|false",
      "start": Number,
      //"type": "1"
    },
  },
  "ul": {
    "html": "<ul><li>LI</li></ul>",
    "droppable": "li",
    "attributes": global
  },
  "li": {
    "html": "<li>LI</li>",
    "attributes": {
      ...global,
      //"value": ".*"
    },
  },
  "p": {
    "html": "<p>P</p>",
    "attributes": global
  },
  "a": {
    "html": "<a href=\"#\">LINK</a>",
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
    "html": "<small>SMALL</small>",
    "droppable": false,
    "draggable": false,
    "attributes": global
  },
  "span": {
    "html": "<span>SPAN</span>",
    "attributes": global
  },
  "strong": {
    "droppable": false,
    "draggable": false,
    "attributes": global
  },
  "video": {
    "html": "<video></video>",
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
    "html": "<img src=\"\" alt=\"\" />",
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
    "html": "<iframe></iframe>",
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
    "html": "<table><tr><td>TABLE</td></tr></table>",
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
    "html": "<tr><td>TABLE</td></tr>",
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
    "html": "<td>TABLE</td>",
    "attributes": {
      ...global,
      "colspan": ".*",
      "headers": ".*",
      "rowspan": ".*",
      "scope": ".*"
    },
  },
  "button": {
    "html": "<button>button</button>",
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
    "html": "<form></form>",
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
    "html": "<input type=\"text\" value=\"\">",
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
    "html": "<label>label</label>",
    "attributes": {
      ...global,
      "for": ".*"
    },
  },
  "select": {
    "html": "<select><option value=\"\">option</option></select>",
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
    "html": "<option value=\"\">option</option>",
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
    "html": "<textarea>textarea</textarea>",
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
