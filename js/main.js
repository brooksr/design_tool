import {elements} from './elements.js';
import {styles} from './styles.js';
//import {template} from './email.js';
import {modal} from './modal.js';

var dt = (function () {
  "use strict";

  let config = {
    node: document.getElementById("design_tool"),
    units: ["px", "%", "em", "vmax", "vmin", "vh", "vw", "none"],
    template: modal,
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
    ],
    elms: {},
    currentElm: undefined,
  };
  let editor = {
    tabs: {},
    elements: {},
    canvas: {
      create: function() {
        editor.elements.canvas = document.createElement("iframe");
        editor.elements.canvas.id = "canvas";
        config.node.appendChild(editor.elements.canvas);
        editor.elements.canvas.contentDocument.body.innerHTML = config.template;
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
        e.target !== config.currentElm ? editor.canvas.setAsActive(e.target) : config.currentElm;
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
        if (config.currentElm !== activeElm) {
          editor.canvas.setAsActive(activeElm)
        }
        return activeElm;
      },
      setAsActive:  function(activeElm) {
        config.currentElm = activeElm;
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
        config.currentElm.style[e.target.name] = value;
      },
      updateStyles: () => {
        var currentStyles = getComputedStyle(config.currentElm);
        var styleInputs = document.querySelectorAll(".styles_tab input");
        styleInputs.forEach(input => {
          var value = currentStyles[input.name];
          if (value.indexOf("rgba") === 0) value = editor.canvas.rgbToHex(value);
          input.value = value;
        });
      },
      bindAttributes:  e => config.currentElm.setAttribute(e.target.name, e.target.value),
      updateAttrs: (activeElm) => {
        let tag = config.currentElm.tagName;
        let html = "";
        for (let i in elements) {
          if ((new RegExp(i, "i")).test(tag)) {
            for (let j in elements[i]) {
              if (elements[i].hasOwnProperty(j)) {
                html += `<div class="input-group">
                  <label>${j.replace("-", " ")}</label>
                  <input name="${j}" value="${activeElm.getAttribute(j) || ""}" type="text" />
                </div>`;
              }
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
        let tab = document.createElement("button");
        tab.id = id;
        tab.textContent = name;
        tab.onclick = e => {
          document.querySelector(".editor_active") && document.querySelector(".editor_active").classList.remove("editor_active");
          document.querySelector("button.active") && document.querySelector("button.active").classList.remove("active");
          panel.classList.add("editor_active");
          e.target.classList.add("active");
        };
        editor.elements.tab_buttons.appendChild(tab);
        panel.classList.add("editor_panel");
        panel.classList.add(id);
        panel.innerHTML = html;
        editor.elements.tab_panels.appendChild(panel);
        return editor.tabs[id] = {
          tab: tab,
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
            View: 
            <input name="editor-view" type="radio" value="Visual" checked="checked" /> Visual
            <input name="editor-view" type="radio" value="Code" /> Code
            <input name="editor-view" type="radio" value="Preview"/> Preview
          </div>
          <div class="input-group">
            Device:
            <input name="device-view" type="radio" value="Desktop" checked="checked"/> Desktop
            <input name="device-view" type="radio" value="Tablet" /> Tablet
            <input name="device-view" type="radio" value="Mobile" /> Mobile
          </div>
          <div class="button-group">
            <button type="button">Undo</button>
            <button type="button">Redo</button>
          </div>
          <div class="button-group">
            <button type="button">Zoom In</button>
            <button type="button">Zoom Out</button>
          </div>
          <div class="button-group">
          <button type="button">Manage Images</button>
            <button type="button">Save</button>
          </div>
        `;
        config.node.appendChild(editor.elements.toolbar);
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
        </div>`).join(""));
      document.querySelector(".styles_tab").onchange = editor.canvas.bindStyles;
      this.panels.addTab("attributes_tab", "Attributes", "").tab.click();
      document.querySelector(".attributes_tab").onchange = editor.canvas.bindAttributes;
      this.panels.addTab("blocks_tab", "Blocks", config.blocks.map(b => `
        <div class="block">
          <h5>${b.id}</h5>
          <code>${b.html.replace(/</g, "&lt;")}</code>
        </div>`).join(""));
      this.canvas.setAsActive(editor.elements.canvas.contentDocument.querySelector("[data-id='0']"));
    }
  };

  editor.create();
  console.log(editor);
  return editor;
})();
