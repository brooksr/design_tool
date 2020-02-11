import {elements} from './elements.js';
import {styles} from './styles.js';
//import {template} from './email.js';
import {template} from './email2.js';
//import {modal} from './modal.js';

let dt = (function () {
  "use strict";

  let config = {
    node: document.getElementById("design_tool"),
    units: ["px", "%", "em", "vmax", "vmin", "vh", "vw", "none"],
    template: localStorage.getItem("dt-01") || template,
    blocks: [{
      id: "heading",
      html: `<div class="header"><h2>Heading</h2><h3>Subhead</h3></div>`
    }, {
      id: "text",
      html: `<div class="text"><p>Text</p></div>`
    }],
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
    canvas: {
      create: function() {
        editor.elements.canvas = document.createElement("iframe");
        editor.elements.canvas.id = "canvas";
        editor.elements.canvas.classList.add("left_area");
        config.node.appendChild(editor.elements.canvas);
        editor.elements.canvas.contentDocument.body.innerHTML = config.template;
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

        editor.elements.canvas.contentDocument.body.addEventListener("click", this.getActiveClick);
        editor.elements.canvas.contentDocument.body.addEventListener("keyup", this.getActiveKey);
        editor.elements.canvas.contentDocument.body.querySelectorAll("*:not(style)").forEach((elm, index) => {
          elm.setAttribute("data-id", String(index));
          this.setContentEditable(elm);
          //this.drag.init(elm);
        });
      },
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
        sheets.forEach(sheet => {
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
      bindAttributes:  e => editor.active_element.setAttribute(e.target.name, e.target.value),
      updateAttrs: (activeElm) => {
        let tag = editor.active_element.tagName.toLowerCase();
        let html = "";
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
        editor.tabs.attributes_tab.panel.innerHTML = html;
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
        } else if (value.indexOf("#") === 0) {
          return `<input name="${i}" value="" type="color"/>`;
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
      addTab: function (id, name, html) {
        let panel = document.createElement("div");
        panel.classList.add("editor_panel");
        panel.classList.add(id);
        panel.innerHTML = html;
        editor.elements.tab_panels.appendChild(panel);
        return editor.tabs[id] = {
          //tab: tab,
          panel: panel
        };
      }
    },
    toolbar: {
      create: function(){
        editor.elements.toolbar = document.createElement("div");
        editor.elements.toolbar.id = "toolbar";
        editor.elements.toolbar.innerHTML = `
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
            <button type="button" id="toggleOutlines"><i class="fas fa-border-none"></i> <span class="tablet-tooltip">Toggle Outlines</span></button>
            <button type="button" id="fullScreen"><i class="fas fa-expand-arrows-alt"></i> <span class="tablet-tooltip">Full Screen</span></button>
            <button type="button" id="manageImages"><i class="far fa-images"></i> <span class="tablet-tooltip">Manage Images</span></button>
            <button type="button" id="save"><i class="far fa-save"></i> <span class="tablet-tooltip">Save</span></button>
          </div>
          <div class="radio-buttons" id="styles-tabs">
            <input id="device-view-Styles" name="styles-tabs" type="radio" value="styles" checked="checked"/>
            <label for="device-view-Styles" >Styles</label>
            <input id="device-view-Attributes" name="styles-tabs" type="radio" value="attributes" />
            <label for="device-view-Attributes" >Attributes</label>
            <input id="device-view-Blocks" name="styles-tabs" type="radio" value="blocks" />
            <label for="device-view-Blocks" >Blocks</label>
            <input id="device-view-Elements" name="styles-tabs" type="radio" value="elements" />
            <label for="device-view-Elements" >Elements</label>
          </div>
        `;
        config.node.appendChild(editor.elements.toolbar);
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
        document.querySelector("#save").addEventListener("click", function (event) {
          localStorage.setItem("dt-01", editor.elements.canvas.contentDocument.body.innerHTML);
        });
        document.querySelector("#manageImages").addEventListener("click", function (event) {
          editor.elements.modal = document.createElement("div");
          editor.elements.modal.classList.add("left_area", "cm_wrap", "images");
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
        document.querySelector("#styles-tabs").addEventListener("change", function (event) {
          document.querySelector(".editor_active") && document.querySelector(".editor_active").classList.remove("editor_active");
          document.querySelector("." + event.target.value + "_tab").classList.add("editor_active");
        });
        document.querySelector("#toggleOutlines").addEventListener("click", function (event) {
          editor.elements.canvas.contentDocument.body.classList.toggle("no-outline");
        });
      },
    },
    create: function () {
      editor.toolbar.create();
      editor.canvas.create();

      this.elements.editor = document.createElement("div");
      this.elements.editor.id = "editor";
      config.node.appendChild(this.elements.editor);

      this.elements.tab_buttons = document.createElement("div");
      this.elements.tab_buttons.id = "tab_buttons";
      this.elements.editor.appendChild(this.elements.tab_buttons);

      this.elements.tab_panels = document.createElement("div");
      this.elements.tab_panels.id = "tab_panels";
      this.elements.editor.appendChild(this.elements.tab_panels);

      this.panels.addTab("styles_tab", "Styles", styles.map(p => `
        <div class="panel">
        <h2>${p.id}</h2>
        ${Object.keys(p).map(i => (i === "id") ? "" : `<div class="input-group">
          <label>${i.replace("-", " ")}</label>
          ${this.panels.createInput(p, i)}
          </div>`).join("")}
        </div>`).join("")).panel.classList.add("editor_active");
      document.querySelector(".styles_tab").onchange = editor.canvas.bindStyles;

      this.panels.addTab("attributes_tab", "Attributes", "");//.tab.click();
      document.querySelector(".attributes_tab").onchange = editor.canvas.bindAttributes;

      this.panels.addTab("blocks_tab", "Blocks", config.blocks.map(b => `
        <div class="block">
          <h5>${b.id}</h5>
          <code draggable="true">${b.html.replace(/</g, "&lt;")}</code>
        </div>`).join(""));

      let printTags = (e, s) => {
        let html = !!e.selfClosing ? `<${s} />` : `<${s}></${s}>`;
        if (!!e.droppable) {
          html = `<${s}><${e.droppable}></${e.droppable}></${s}>`;
        }
        return html.replace(/</g, "&lt;");
      };
      /*let printTags = (e, s) => {
        let html = !!e.selfClosing ? `<${s} />` : `<${s}></${s}>`;
        if (!!e.droppable) {
          let sn = e.droppable.split(",");
          sn.forEach(tn => printTags(elements[tn], tn))
          html = `<${s}><${e.droppable}></${e.droppable}></${s}>`;
        }
        return html.replace(/</g, "&lt;");
      };*/
      this.panels.addTab("elements_tab", "Elements", Object.keys(elements).map(b => `
        <div class="block">
          <!--<h5>${b}</h5>-->
          <code draggable="true">${printTags(elements[b], b)}</code>
        </div>`).join(""));

      this.canvas.setAsActive(editor.elements.canvas.contentDocument.querySelector("[data-id='0']"));
    }
  };

  editor.create();
  console.log(editor);
  return editor;
})();
