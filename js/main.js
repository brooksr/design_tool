(function(){
  "use strict";
  /**
   * TODO
   * Media queries
   * Psuedo elements
   * Animation
   * Transition and Transform
   * Grid, Flexbox
   * SVG, masking
   * Lists
   * */ 
  const design_tool = document.getElementById("design_tool");
  const defaults = {
    color: "#000000",
    size: ["auto", "min-content", "max-content", "fit-content", "100%"],
    overflow: ["visible", "hidden", "clip", "scroll", "auto"],
  }
  let template = `<h1 id="h1">Hello World!</h1>
  <p id="p">This is a test of the design tool</p>
  <button id="button">Nice</button>`;
  let elements = {
    "*": {
      class: "",
      id: "",
      tabindex: "",
      title: ""
    },
    "h1-h6": {},
    "body": {},
    "blockquote": {
      "cite": ""
    },
    "div": {},
    "hr": {},
    "ol": {
      reversed: false,
      start: 1,
      type: 1
    },
    "ul": {},
    "li": {
      value : "",
    },
    "p": {},
    "a": {
      download: "",
      href: "",
      ping: "",
      target: "",
    },
    "br": {},
    "em": {},
    "small": {},
    "span": {},
    "strong": {},
    "video": {
      autoplay: "",
      buffered: "",
      controls: "",
      crossorigin: "",
      currentTime: "",
      duration: "",
      height: "",
      loop: "",
      muted: "",
      playsinline: "",
      poster: "",
      preload: "",
      src: "",
      width: "",
    },
    "img": {
      alt: "",
      crossorigin: "",
      decoding: "",
      height: "",
      sizes: "",
      src: "",
      srcset: "",
      width: "",
    },
    "iframe": {
      allow: "",
      height: "",
      name: "",
      referrerpolicy: "",
      sandbox: "",
      src: "",
      srcdoc: "",
      width: "",
    },
    "table": {},
    "tbody": {},
    "thead": {},
    "tfoot": {},
    "tr": {},
    "th": {
      colspan: "",
      headers: "",
      rowspan: "",
      scope: "",
    },
    "td": {
      colspan: "",
      headers: "",
      rowspan: "",
      scope: "",
    },
    "button": {
      autofocus: "",
      disabled: "",
      name: "",
      type: "",
      value: "",
    },
    "form": {
      action: "",
      autocomplete: "",
      method: "",
      novalidate: "",
      target: "",
    },
    "input": {
      accept: "",
      alt: "",
      autocomplete: "",
      autofocus: "",
      capture: "",
      checked: "",
      dirname: "",
      disabled: "",
      form: "",
      formaction: "",
      formenctype: "",
      formmethod: "",
      formnovalidate: "",
      formtarget: "",
      height: "",
      list: "",
      max: "",
      maxlength: "",
      min: "",
      minlength: "",
      multiple: "",
      name: "",
      pattern: "",
      placeholder: "",
      readonly: "",
      required: "",
      size: "",
      src: "",
      step: "",
      type: "",
      value: "",
      width: "",
    },
    "label": {
      for: "",
    },
    "select": {
      autocomplete: "",
      autofocus: "",
      disabled: "",
      multiple: "",
      name: "",
      required: "",
      size: "",
    },
    "option": {
      disabled: "",
      label: "",
      selected: "",
      value: "",
    },
    "textarea": {
      autocomplete: "",
      autofocus: "",
      cols: "",
      disabled: "",
      maxlength: "",
      minlength: "",
      name: "",
      readonly: "",
      required: "",
      rows: "",
      spellcheck: "",
      wrap: "",
    },
  };
  let panels = [
    {
      "id": "Text",
      "font-family": ["Arial Regular", "Book Condensed", "Calibri Bold"],
      "font-style": ["normal", "italic", "oblique"],
      "font-weight": ["normal", "bold", "lighter"],
      "font-size": "16px",
      "line-height": "1.25",
      "letter-spacing": "0px",
      "word-spacing": "0px",
      "color": defaults.color,
      "text-transform": ["capitalize", "lowercase", "uppercase"],
      /*FIX*/"text-decoration":["underline", "line-through", "overline"], //e => [["underline", "line-through", "overline"], defaults.color, ["solid", "double", "dotted", "dashed", "wavy", "initial", "inherit"]],
      "text-align": ["left", "center", "right", "justify"],
      "text-indent": "0em",
      /*FIX*/"text-shadow": "1px 1px #000000",
      "word-wrap": ["normal", "break-word", "anywhere"],
      "white-space": ["normal", "pre", "nowrap", "pre-wrap", "pre-line"],
      "text-wrap": ["wrap", "nowrap", "balance", "stable", "pretty"],
      "text-overflow": ["clip", "ellipsis"],
    }, {
      "id": "Sizing",
      "height": defaults.size,
      "width": defaults.size,
      "min-width": defaults.size,
      "max-width": defaults.size,
      "min-height": defaults.size,
      "max-height": defaults.size,
      "overflow-x": defaults.overflow,
      "overflow-y": defaults.overflow,
      "resize": ["none", "both", "horizontal", "vertical"],
    }, {
      "id": "Positioning",
      "position": ["static", "relative", "absolute", "fixed", "inherit"],
      "top": ["auto", "0px"],
      "right": ["auto", "0px"],
      "bottom": ["auto", "0px"],
      "left": ["auto", "0px"],
      "margin": ["0px", "0px", "0px", "0px"],
      "padding": ["0px", "0px", "0px", "0px"],
      "clear": ["none", "inline-start", "inline-end", "block-start", "block-end", "left", "right", "top", "bottom"],
      "float": ["none", "block-start", "block-end", "inline-start", "inline-end", "snap-block", "snap-inline", "left", "right", "top", "bottom"],
      "display": ["block", "none", "inline", "inline-block"],
      "alignment-baseline": ["baseline", "text-bottom", "alphabetic", "ideographic", "middle", "central", "mathematical", "text-top", "bottom", "center", "top"],
      "z-index": 1,
    }, {
      "id": "Style",
      "background-color": defaults.color,
      //"background-image": "",
      //"background-repeat": "",
      //"background-attachment": "",
      //"background-position": "",
      //"filter": "",
      "border": "0px solid",
      "outline": "0px solid",
      "border-radius": "0px",
      "opacity": "1.00",
      "visibility": ["visible", "hidden"],
      "cursor": ["auto", "default", "none", "context-menu", "help", "pointer", "progress", "wait", "cell", "crosshair", "text", "vertical-text", "alias", "copy", "move", "no-drop", "not-allowed", "e-resize", "n-resize", "ne-resize", "nw-resize", "s-resize", "se-resize", "sw-resize", "w-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "col-resize", "row-resize", "all-scroll", "zoom-in", "zoom-out", "grab", "grabbing"],
    }
  ];

  let create_input = (p, i) => {
    const units = ["px", "%", "em", "vmax", "vmin", "vh", "vw", "none"];
    const unit_regex = new RegExp(units.join("|"), "g");
    let html = "";
    let value = p[i];
    let attrs = "";
    if (Array.isArray(value)) {
      html += `<select>${value.map((o, ind) => `<option value="${o}">${o.replace("-", " ")}</option>`).join("")}</select>`;
    } else if (typeof value === "function") {
      //html += create_input(value);
    } else if (!isNaN(value)) {
      if (String(value).indexOf(".") != -1) {
        attrs = `step=".${"0".repeat(String(value).split(".")[1].length - 1)}1"`;
      }
      html += `<input value="${value}" type="number" ${attrs}/>`
    } else if (typeof value === "string") {
      let unit = "";
      var type = "text";
      let num = value.replace(unit_regex, "");
      if (value.indexOf("#") === 0) type = "color";
      else if (!isNaN(num)) {
        if (value.match(unit_regex)) unit = value.match(unit_regex)[0];
        else unit = "none";
        attrs += `class="has-units" `;
        if(num.indexOf(".") != -1) {
          attrs += `step=".${"0".repeat(num.split(".")[1].length - 1)}1"`;
        }
        value = num;
        type = "number";
      }
      html += `<input value="${value}" type="${type}" ${attrs}/>`
      if (type == "number") {
        html += `<select class="units">${units.map(u => `<option value="${u}" ${(u == unit) ? "selected" : ""}>${u}</option>`)}</select>`;
      }
    }
    
    return html;
  }

  // Create Canvas
  let activeDiv;
  let getActive = e => {
    console.log("1")
    let sel = window.getSelection();
    let range = sel.getRangeAt(0);
    let node = document.createElement('span');
    range.insertNode(node);
    range = range.cloneRange();
    range.selectNodeContents(node);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
    activeDiv = node.parentNode;
    node.parentNode.removeChild(node);

    Array.prototype.forEach.call(canvas.querySelectorAll('*'), function(elm) {
      elm.removeAttribute("data-dt");
    });
    activeDiv.setAttribute("data-dt", "1");
    return activeDiv;
  }
  const canvas = document.createElement("div");
  canvas.id = "canvas";
  canvas.innerHTML = template;
  canvas.contentEditable  = "true";
  design_tool.appendChild(canvas);
  canvas.addEventListener("click", getActive);
  canvas.addEventListener("keyup", getActive);
  // canvas.querySelectorAll("*").forEach(elm => {
  //   elm.draggable = true;
  //   elm.addEventListener('dragstart', function (ev) {
  //     ev.preventDefault();
  //     console.log("start");
  //     ev.dataTransfer.setData("text/plain", ev.target.id);
  //     ev.dataTransfer.dropEffect = "move";
  //   });
  //   elm.addEventListener('dragenter', function (ev) {
  //     console.log("enter");
  //     ev.preventDefault();
  //     console.log(ev);
  //     ev.dataTransfer.dropEffect = "move";
  //   });
  //   elm.addEventListener('dragover', function (ev) {
  //     ev.preventDefault();
  //     console.log("over");
  //     console.log(ev);
  //     ev.dataTransfer.dropEffect = "move";
  //   });
  //   elm.addEventListener('drop', function (ev) {
  //     ev.preventDefault();
  //     console.log("drop");
  //     console.log(ev);
  //     const data = ev.dataTransfer.getData("text/plain");
  //     ev.target.appendChild(document.getElementById(data));
  //   });
  // });

  // Create Panels
  let editor = document.createElement("div");
  editor.id = "editor"
  let tab_buttons = document.createElement("div");
  tab_buttons.id = "tab_buttons"
  let tab_panels = document.createElement("div");
  tab_panels.id = "tab_panels";
  design_tool.appendChild(editor);
  editor.appendChild(tab_buttons);
  editor.appendChild(tab_panels);
  let add_tab = (id, name, elm) => {
    let tab = document.createElement("button");
    tab.id = id;
    tab.textContent = name;
    tab.onclick = e => {
      //debugger;
      Array.from(document.querySelectorAll(".editor_panel")).forEach(p => p.classList.remove("editor_active"));
      elm.classList.add("editor_active");
    }
    tab_buttons.appendChild(tab);
    elm.classList.add("editor_panel");
    tab_panels.appendChild(elm);
  }
  const panels_wrap = document.createElement("div");
  panels_wrap.id = "panels";
  panels.forEach(p => {
    let panel = document.createElement("div");
    panel.className = "panel";
    let html = `<h2>${p.id}</h2>`;
    for (let i in p) {
      if (i != "id") {
        html += `<div class="input-group">`;
        html += `<label>${i.replace("-", " ")}</label>`;
        html += create_input(p, i);
        html += `</div>`;
      }
    }
    panel.innerHTML = html;
    panels_wrap.appendChild(panel);
  });
  add_tab("styles_tab", "Styles", panels_wrap);
  var attrs = document.createElement("div");
  attrs.textContent = "Attributes placeholder";
  add_tab("attributes_tab", "Attributes", attrs);
  var blocks = document.createElement("div");
  blocks.textContent = "Blocks placeholder";
  add_tab("blocks_tab", "Blocks", blocks);

})();