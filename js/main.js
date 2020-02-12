import {elements} from './elements.js';
import {styles} from './styles.js';
import {blocks} from './blocks.js';
import {email} from './email.js';
import {email2} from './email2.js';
import {modal} from './modal.js';

window.dt = (function () {
  "use strict";

  let config = {
    node: document.getElementById("design_tool"),
    units: ["px", "%", "em", "vmax", "vmin", "vh", "vw", "none"],
    template: localStorage.getItem("dt-01") ? decodeURIComponent(localStorage.getItem("dt-01")) : modal,
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
      }
    ],
    blocks: blocks,
    images: [
      "https://via.placeholder.com/600x50?text=LOGO",
      "https://via.placeholder.com/50x50?text=1",
      "https://via.placeholder.com/250x250?text2",
      "https://via.placeholder.com/50x300?text=3",
      "https://via.placeholder.com/50x50?text=4",
    ]
  };
  let editor = {
    active_element: undefined,
    styles: [],
    tabs: {},
    elements: {},
    update: function(i){
      editor.elements.canvas.contentDocument.body.innerHTML = "";
      editor.elements.canvas.srcdoc = config.templates[i].html;
      if (document.getElementById("menu_close") != null) document.getElementById("menu_close").click();
    },
    save: function () {
      localStorage.setItem("dt-01", encodeURIComponent(editor.elements.canvas.contentDocument.documentElement.innerHTML));
      alert("Saved!");
    },
    shortcut: {
      save: function(event) {
        let s = 83;
        if (event.which == s && event.ctrlKey) {
          event.preventDefault();
          editor.save();
        }
      }
    },
    canvas: {
      setContentEditable: elm => {
        const hasTextNode = Array.from(elm.childNodes).filter(node => {
          return Array.from(node.childNodes).filter(node => {
            return node.nodeName === "#text"
              && node.textContent.replace(/\s/g, "") !== ""
              && !node.parentNode.isContentEditable;
          }).length > 0;
        }).length > 0;
        if (hasTextNode) elm.contentEditable = "true";
      },
      drag: {
        start: function (e) {
          // Target (this) element is the source node.
          editor.src = this;
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('text/html', this.outerHTML);
          this.classList.add('dragElem');
        },
        enter: function(){},
        over: function (e) {
          if (e.preventDefault) {
            e.preventDefault(); // Necessary. Allows us to drop.
          }
          this.classList.add('over');
          e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
          return false;
        },
        leave: function (e) {
          this.classList.remove('over');  // this / e.target is previous target element.
        },
        drop: function (e) {
          // this/e.target is current target element.
          if (e.stopPropagation) {
            e.stopPropagation(); // Stops some browsers from redirecting.
          }
          // Don't do anything if dropping the same column we're dragging.
          if (editor.src != this) {
            this.parentNode.removeChild(editor.src);
            var dropHTML = e.dataTransfer.getData('text/html');
            this.insertAdjacentHTML('beforebegin',dropHTML);
            var dropElem = this.previousSibling;
            addDnDHandlers(dropElem);

          }
          this.classList.remove('over');
          return false;
        },
        end: function() {
          this.classList.remove('over');
        },
        init: function(elem) {
          elem.draggable = true;
          elem.addEventListener('dragstart', this.start, false);
          elem.addEventListener('dragenter', this.enter, false)
          elem.addEventListener('dragover', this.over, false);
          elem.addEventListener('dragleave', this.leave, false);
          elem.addEventListener('drop', this.drop, false);
          elem.addEventListener('dragend', this.end, false);
        },
      },
      getActiveClick: function (e) {
        e.target !== editor.active_element ? editor.canvas.setAsActive(e.target) : editor.active_element;
      },
      getActiveKey: function () {
        let sel = editor.elements.canvas.contentWindow.getSelection();
        let range = sel.getRangeAt(0);
        let node = document.createElement('span');
        range.insertNode(node);
        range = range.cloneRange();
        range.selectNodeContents(node);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
        let activeElm = node.parentNode;
        node.parentNode.removeChild(node);
        if (editor.active_element !== activeElm) {
          editor.canvas.setAsActive(activeElm)
        }
        return activeElm;
      },
      setAsActive:  function(activeElm) {
        editor.active_element = activeElm;
        console.log(activeElm);
        this.updateAttrs(activeElm);
        this.updateStyles();
        editor.elements.canvas.contentDocument.querySelector('[data-status="active"]') && editor.elements.canvas.contentDocument.querySelector('[data-status="active"]').removeAttribute("data-status");
        activeElm.setAttribute("data-status", "active");
        return activeElm;
      },
      changeActive: (dir) => {
        let currentId = Number(editor.active_element.getAttribute("data-id"));
        let sibling;
        if (dir == "up") {
          if (currentId === "0") return alert("First element, can't move up.")
          sibling = editor.elements.canvas.contentDocument.querySelector("[data-id='"+(currentId - 1)+"']");
          editor.canvas.setAsActive(sibling);
        } else {
          sibling = editor.elements.canvas.contentDocument.querySelector("[data-id='"+(currentId + 1)+"']");
          editor.canvas.setAsActive(sibling);
        }
      },
      rgbToHex: function(str){
        var numbers = str.match(/\d/g);
        var toHex = function (rgb) {
          var hex = Number(rgb).toString(16);
          if (hex.length < 2) hex = "0" + hex;
          return hex;
        };
        return "#" + toHex(numbers[0]) + toHex(numbers[1]) + toHex(numbers[2]);
      },
      bindStyles: e => {
        var value = e.target.value;
        editor.active_element.style[e.target.name] = value;
      },
      updateStyles: () => {
        let sheets = editor.elements.canvas.contentDocument.styleSheets;
        sheets = Array.from(sheets).filter(s => s.title !== "editor");
        editor.styles = [];
        sheets.forEach(sheet => {
          if (!!sheet.href) return;
          editor.styles = editor.styles.concat(Array.from(sheet.rules).map(rule => {
            return {
              set: rule.parentStyleSheet.insertRule,
              del: rule.parentStyleSheet.deleteRule,
              selectorText: rule.selectorText,
              cssText: rule.cssText,
              style: rule.style,
              elements: editor.elements.canvas.contentDocument.querySelectorAll(rule.selectorText)
            }
          }));
        });

        console.log(editor.styles);
        var currentStyles = getComputedStyle(editor.active_element);
        var styleInputs = document.querySelectorAll(".styles_tab input");
        styleInputs.forEach(input => {
          var value = currentStyles[input.name];
          if (value.indexOf("rgba") === 0) value = editor.canvas.rgbToHex(value);
          input.value = value;
        });
      },
      updateIds: () => {
        editor.elements.canvas.contentDocument.body.querySelectorAll("*:not(style):not(script)").forEach((elm, index) => {
          elm.setAttribute("data-id", String(index));
          editor.canvas.setContentEditable(elm);
          //editor.canvas.drag.init(elm);
        });
      },
      moveUp: () => {
        let currentId = Number(editor.active_element.getAttribute("data-id"));
        if (currentId === "0") return alert("First element, can't move up.")
        let sibling = editor.elements.canvas.contentDocument.querySelector("[data-id='"+(currentId - 1)+"']");
        sibling.parentNode.insertBefore(editor.active_element, sibling);
        editor.canvas.updateIds();
      },
      moveDown: () => {
        //let currentId = Number(editor.active_element.getAttribute("data-id"));
        //let sibling = editor.elements.canvas.contentDocument.querySelector("[data-id='"+(currentId + 1)+"']");
        //return alert("Last element, can't move down.")
        if (editor.active_element.nextElementSibling && editor.active_element.nextElementSibling.nextElementSibling) {
          editor.active_element.parentNode.insertBefore(editor.active_element, editor.active_element.nextElementSibling.nextElementSibling);
        } else if (editor.active_element.nextElementSibling && editor.active_element.nextElementSibling.parentNode) {
          editor.active_element.parentNode.appendChild(editor.active_element, editor.active_element.nextElementSibling.parentNode);
        } else if (editor.active_element.parentNode.nextElementSibling && editor.active_element.nextElementSibling.parentNode) {
          editor.active_element.parentNode.appendChild(editor.active_element, editor.active_element.nextElementSibling.parentNode);
        }
        editor.canvas.updateIds();
      },
      bindAttributes:  e => editor.active_element.setAttribute(e.target.name, e.target.value),
      updateAttrs: (activeElm) => {
        let tag = editor.active_element.tagName.toLowerCase();
        let  html = `<h2>Attributes</h2>`;
        if (!!elements[tag]) {
          for (let a in elements[tag].attributes) {
            if (elements[tag].attributes.hasOwnProperty(a)) {
              html += `<div class="input-group">
                  <label>${a.replace("-", " ")}</label>
                  <input name="${a}" value="${activeElm.getAttribute(a) || ""}" type="text" />
                </div>`;
            }
          }
        }
        editor.tabs.attributes_tab.innerHTML = html;
      }
    },
    panels: {
      createInput: (p, i) => {
        let value = p[i], attributes = "";
        if (Array.isArray(value)) {
          return `<select name="${i}">${value.map(o => `<option value="${o}">${o.replace("-", " ")}</option>`).join("")}</select>`;
        } else if (!isNaN(value) && typeof value == "number") {
          if (String(value).indexOf(".") !== -1) {
            attributes = `step=".${"0".repeat(String(value).split(".")[1].length - 1)}1"`;
          }
          return `<input name="${i}" value="" type="number" ${attributes}/>`;
        }
        return `<input name="${i}" value="" type="text"/>`;
        // let html = "", value = p[i], attributes = "";
        // if (Array.isArray(value)) {
        //   html += `<select name="${i}">${value.map(o => `<option value="${o}">${o.replace("-", " ")}</option>`).join("")}</select>`;
        // } else if (!isNaN(value)) {
        //   if (String(value).indexOf(".") !== -1) {
        //     attributes = `step=".${"0".repeat(String(value).split(".")[1].length - 1)}1"`;
        //   }
        //   html += `<input value="${value}" type="number" ${attributes}/>`;
        // } else if (typeof value === "string") {
        //   const unit_regex = new RegExp(config.units.join("|"), "g");
        //   let unit = "";
        //   let type = value.indexOf("#") === 0 ? "color" : "text";
        //   let num = value.replace(unit_regex, "");
        //   if (!isNaN(num)) {
        //     unit = value.match(unit_regex) ? value.match(unit_regex)[0] : "none";
        //     attributes += `class="has-units" `;
        //     if (num.indexOf(".") !== -1) {
        //       attributes += `step=".${"0".repeat(num.split(".")[1].length - 1)}1"`;
        //     }
        //     value = num;
        //     type = "number";
        //   }
        //   html += `<input value="${value}" type="${type}" ${attributes}/>`;
        //   if (type === "number") {
        //     html += `<select class="units">${config.units.map(u => `<option value="${u}" ${(u === unit) ? "selected" : ""}>${u}</option>`)}</select>`;
        //   }
        // }
        // return html;
      },
    },
    toolbar: {
      create: function(){
        editor.elements.toolbar = document.createElement("div");
        editor.elements.toolbar.id = "toolbar";
        editor.elements.toolbar.innerHTML = `
          <div class="button-group">
            <button type="button" id="openMenu"><i class="fas fa-bars"></i> <span class="tablet-tooltip">Menu</span></button>
          </div>
          <div class="input-group">
            <div class="switch">
              <input id="show_code" type="checkbox" class="switch-input" />
              <label for="show_code" class="switch-label">Visual</label>
            </div>
          </div>
          <div class="radio-buttons" id="device-view">
            <input id="device-view-desktop" name="device-view" type="radio" value="100%" checked="checked"/>
            <label for="device-view-desktop" ><i class="fas fa-desktop"></i> <span class="tablet-tooltip">Desktop</span></label>
            <input id="device-view-tablet" name="device-view" type="radio" value="720px" />
            <label for="device-view-tablet" ><i class="fas fa-tablet-alt"></i> <span class="tablet-tooltip">Tablet</span></label>
            <input id="device-view-mobile" name="device-view" type="radio" value="360px" />
            <label for="device-view-mobile" ><i class="fas fa-mobile-alt"></i> <span class="tablet-tooltip">Mobile</span></label>
          </div>
          <!--<div class="button-group">
            <button type="button">Undo</button>
            <button type="button">Redo</button>
          </div>-->
          <div class="button-group">
            <button type="button" id="zoomIn"><i class="fas fa-search-plus"></i> <span class="tablet-tooltip">Zoom In</span></button>
            <button type="button" id="zoomO">100%</button>
            <button type="button" id="zoomOut"><i class="fas fa-search-minus"></i> <span class="tablet-tooltip">Zoom Out</span></button>
          </div>
          <div class="button-group">
            <button type="button" onclick="dt.canvas.moveUp()"><i class="fas fa-arrow-up"></i> <span class="tablet-tooltip">Order Up</span></button>
            <button type="button" onclick="dt.canvas.moveDown()"><i class="fas fa-arrow-down"></i> <span class="tablet-tooltip">Order Down</span></button>
            <button type="button" onclick="dt.canvas.changeActive('up')"><i class="far fa-arrow-alt-circle-up"></i> <span class="tablet-tooltip">Focus Up</span></button>
            <button type="button" onclick="dt.canvas.changeActive()"><i class="far fa-arrow-alt-circle-down"></i> <span class="tablet-tooltip">Focus Down</span></button>
          </div>
          <div class="button-group">
            <button type="button" id="toggleOutlines"><i class="fas fa-border-none"></i> <span class="tablet-tooltip">Toggle Outlines</span></button>
            <button type="button" id="fullScreen"><i class="fas fa-expand-arrows-alt"></i> <span class="tablet-tooltip">Full Screen</span></button>
          </div>
          <div class="radio-buttons" id="styles-tabs">
          <input id="device-view-Attributes" name="styles-tabs" type="radio" value="attributes" checked="checked" />
          <label for="device-view-Attributes" >Attributes</label>
            <input id="device-view-Styles" name="styles-tabs" type="radio" value="styles"/>
            <label for="device-view-Styles" >Styles</label>
            <input id="device-view-Blocks" name="styles-tabs" type="radio" value="blocks" />
            <label for="device-view-Blocks" >Blocks</label>
          </div>
        `;
        config.node.appendChild(editor.elements.toolbar);
        document.querySelector("#openMenu").addEventListener("click", function (event) {
          editor.elements.menu = document.createElement("div");
          editor.elements.menu.classList.add("left_area", "cm_wrap", "modal", "menu");
          editor.elements.menu.innerHTML = `
            <button id="menu_close">&times;</button>
            <button type="button" id="manageImages"><i class="far fa-images"></i> <span class="">Manage Images</span></button>
            <button type="button" id="save"><i class="far fa-save"></i> <span class="">Save</span></button>
            <hr />
            <h3>New</h3>
            <ul>
            ${config.templates.map((i, index) => `<li onclick="dt.update(${index})">
              ${i.icon}
              <h4>${i.name}</h4>
              </li>`).join("")}
            </ul>
            <h3>Open</h3>
            <ul>
            ${config.templates.map((i, index) => `<li onclick="dt.update(${index})">
              ${i.icon}
              <h4>${i.name}</h4>
              </li>`).join("")}
            </ul>
          `;
          config.node.appendChild(editor.elements.menu);
          document.querySelector("#save").addEventListener("click", editor.save);
          document.querySelector("#manageImages").addEventListener("click", function (event) {
            editor.elements.modal = document.createElement("div");
            editor.elements.modal.classList.add("left_area", "cm_wrap", "modal", "images");
            editor.elements.modal.innerHTML = `
              <button id="modal_close">&times;</button>
              <h3>Manage Images</h3>
              <form action="" method="post" enctype="multipart/form-data">
                <input type="file" name="fileToUpload" id="fileToUpload">
                <input type="submit" value="Upload Image" name="submit">
              </form>
              <ul>
              ${config.images.map(i => `<li>
                <img src="${i}" />
                <a href="${i}" target="_blank">${i}</a><span class="image-size">99kb</span>
                </li>`).join("")}
              </ul>
            `;
            config.node.appendChild(editor.elements.modal);
            document.getElementById("modal_close").addEventListener("click", function (event) {
              editor.elements.modal.parentNode.removeChild(editor.elements.modal);
            });
          });
          document.getElementById("menu_close").addEventListener("click", function (event) {
            editor.elements.menu.parentNode.removeChild(editor.elements.menu);
          });
        });
        document.querySelector("#device-view").addEventListener("change", function (event) {
          editor.elements.canvas.style.maxWidth = event.target.value;
        });
        document.querySelector("#fullScreen").addEventListener("click", function (event) {
          config.node.requestFullscreen().then(e => console.log(e));
        });
        document.querySelector("#zoomIn").addEventListener("click", function (event) {
          let transform = getComputedStyle(editor.elements.canvas.contentDocument.body).transform.split("(")[1].split(",")[0];
          let newT = Number(transform) + 0.25;
          editor.elements.canvas.contentDocument.body.style.transform = `matrix(${newT}, 0, 0, ${newT}, 0, 0)`;
        });
        document.querySelector("#zoomO").addEventListener("click", function (event) {
          editor.elements.canvas.contentDocument.body.style.transform = `matrix(1, 0, 0, 1, 0, 0)`;
        });
        document.querySelector("#zoomOut").addEventListener("click", function (event) {
          let transform = getComputedStyle(editor.elements.canvas.contentDocument.body).transform.split("(")[1].split(",")[0];
          let newT = Number(transform) - 0.25;
          editor.elements.canvas.contentDocument.body.style.transform = `matrix(${newT}, 0, 0, ${newT}, 0, 0)`;
        });
        document.querySelector("#show_code").addEventListener("change", function (event) {
          editor.elements.cm.style.display = (event.target.checked) ? "block" : "none";
          editor.cm.refresh();
        });
        document.querySelector("#styles-tabs").addEventListener("change", function (event) {
          document.querySelector(".editor_active") && document.querySelector(".editor_active").classList.remove("editor_active");
          document.querySelector("." + event.target.value + "_tab").classList.add("editor_active");
        });
        document.querySelector("#toggleOutlines").addEventListener("click", function (event) {
          editor.elements.canvas.contentDocument.body.classList.toggle("no-outline");
        });
      },
    },
    onload: function(){
      editor.elements.canvas_style = document.createElement("style");
      editor.elements.canvas.contentDocument.head.appendChild(editor.elements.canvas_style);
      editor.elements.canvas_style.title = "editor";
      editor.elements.canvas_style.innerHTML = `
        body {
          transform: scale(1);
          overflow: auto;
          transform-origin: top left;
          transition: transform 0.5s ease;
          box-sizing: border-box;
        }
        .no-outline * {
          outline: none !important;
        }
        * {
          box-sizing: inherit;
          outline: 1px dashed #ccc;
        }
        [contenteditable] {
          outline: 1px dotted #333;
        }
        [data-id]:hover {
          outline: 1px dashed blue;
        }
        [data-status="active"] {
          outline: 1px dashed green !important;
        }
        :-moz-drag-over {
          outline: 1px solid yellow;
        }`;

        editor.elements.canvas.contentDocument.body.addEventListener("click", editor.canvas.getActiveClick);
        editor.elements.canvas.contentDocument.body.addEventListener("keyup", editor.canvas.getActiveKey);
        editor.elements.canvas.contentDocument.body.querySelectorAll("*:not(style):not(script)").forEach((elm, index) => {
          elm.setAttribute("data-id", String(index));
          editor.canvas.setContentEditable(elm);
          //editor.canvas.drag.init(elm);
        });
  
        document.addEventListener("keydown", editor.shortcut.save);
        editor.elements.canvas.contentDocument.addEventListener("keydown", editor.shortcut.save);

        editor.canvas.setAsActive(editor.elements.canvas.contentDocument.querySelector("[data-id='0']"));
    },
    create: function () {
      editor.toolbar.create();

      editor.elements.canvas = document.createElement("iframe");
      editor.elements.canvas.id = "canvas";
      editor.elements.canvas.classList.add("left_area");
      editor.elements.canvas.srcdoc = config.template;
      config.node.appendChild(editor.elements.canvas);
      editor.elements.canvas.onload = editor.onload;

      editor.elements.cm = document.createElement("div");
      editor.elements.cm.style.display = "none";
      editor.elements.cm.classList.add("left_area", "cm_wrap");
      config.node.appendChild(editor.elements.cm);
      editor.cm = CodeMirror(editor.elements.cm, {
        value: config.template,
        lineNumbers: true,
        theme: "darcula",
        mode: "htmlmixed"
      });

      editor.elements.editor = document.createElement("div");
      editor.elements.editor.id = "editor";
      config.node.appendChild(editor.elements.editor);

      editor.elements.tab_buttons = document.createElement("div");
      editor.elements.tab_buttons.id = "tab_buttons";
      editor.elements.editor.appendChild(editor.elements.tab_buttons);

      editor.elements.tab_panels = document.createElement("div");
      editor.elements.tab_panels.id = "tab_panels";
      editor.elements.editor.appendChild(editor.elements.tab_panels);

      let id = "styles_tab";
      let html = styles.map(p => `
        <div class="panel">
        <h2>${p.id}</h2>
        ${Object.keys(p).map(i => (i === "id") ? "" : `<div class="input-group">
          <label>${i.replace("-", " ")}</label>
          ${editor.panels.createInput(p, i)}
          </div>`).join("")}
        </div>`).join("");
      editor.tabs[id] = document.createElement("div");
      editor.tabs[id].classList.add("editor_panel", id);
      editor.tabs[id].innerHTML = html;
      editor.elements.tab_panels.appendChild(editor.tabs[id]);
      document.querySelector(".styles_tab").onchange = editor.canvas.bindStyles;

      id = "attributes_tab";
      editor.tabs[id] = document.createElement("div");
      editor.tabs[id].classList.add("editor_panel", "editor_active", id);
      editor.elements.tab_panels.appendChild(editor.tabs[id]);
      document.querySelector(".attributes_tab").onchange = editor.canvas.bindAttributes;

      let printTags = (e, s) => {
        let html = !!e.selfClosing ? `<${s} />` : `<${s}></${s}>`;
        if (!!e.droppable) {
          html = `<${s}><${e.droppable}></${e.droppable}></${s}>`;
        }
        return html.replace(/</g, "&lt;");
      };
      id = "blocks_tab";
      html = "<h4>Custom Blocks</h4>"
      html += config.blocks.map(b => `
        <div class="block">
          <h5>${b.id}</h5>
          <code draggable="true">${b.html.replace(/</g, "&lt;")}</code>
        </div>`).join("");
      html += "<h4>Elements</h4>"
      html += Object.keys(elements).map(b => `
        <div class="block">
          <!--<h5>${b}</h5>-->
          <code draggable="true">${printTags(elements[b], b)}</code>
        </div>`).join("");
      editor.tabs[id] = document.createElement("div");
      editor.tabs[id].innerHTML = html;
      editor.tabs[id].classList.add("editor_panel", id);
      editor.elements.tab_panels.appendChild(editor.tabs[id]);

      return this;
    }
  };
  return {
    config: config,
    ...editor.create()
  };
})();
console.log(dt);