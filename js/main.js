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
        editor.elements.canvas = document.createElement("div");
        editor.elements.canvas.id = "canvas";
        editor.elements.canvas.innerHTML = config.template;
        config.node.appendChild(editor.elements.canvas);
        editor.elements.canvas.addEventListener("click", this.getActiveClick);
        editor.elements.canvas.addEventListener("keyup", this.getActiveKey);
        editor.elements.canvas.querySelectorAll("*").forEach((elm, index) => {
          elm.setAttribute("data-id", String(index));
        });
      },
      drag: (elm) => {
        const hasTextNode = Array.from(elm.childNodes).filter(node => {
          return Array.from(node.childNodes).filter(node => {
            return node.nodeName === "#text"
              && node.textContent.replace(/\s/g, "") !== ""
              && !node.parentNode.isContentEditable;
          }).length > 0;
        }).length > 0;
        elm.draggable = true;
        if (hasTextNode) elm.contentEditable = "true";
        elm.addEventListener('dragstart', function (ev) {
          ev.preventDefault();
          console.log("start");
          ev.dataTransfer.setData("text/plain", ev.target.getAttribute("data-id"));
          ev.dataTransfer.dropEffect = "move";
        });
        elm.addEventListener('dragenter', function (ev) {
          console.log("enter");
          ev.preventDefault();
          console.log(ev);
          ev.dataTransfer.dropEffect = "move";
        });
        elm.addEventListener('dragover', function (ev) {
          ev.preventDefault();
          console.log("over");
          console.log(ev);
          ev.dataTransfer.dropEffect = "move";
        });
        elm.addEventListener('drop', function (ev) {
          ev.preventDefault();
          console.log("drop");
          console.log(ev);
          const data = ev.dataTransfer.getData("text/plain");
          ev.target.appendChild(document.querySelector("[data-id="+data+"]"));
        });
      },
      getActiveClick: function (e) {
        e.target !== config.currentElm ? editor.canvas.setAsActive(e.target) : config.currentElm
      },
      getActiveKey: function () {
        let sel = window.getSelection();
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
          this.setAsActive(activeElm)
        }
        return activeElm;
      },
      setAsActive:  function(activeElm) {
        config.currentElm = activeElm;
        console.log(activeElm);
        this.updateAttrs(activeElm);
        this.updateStyles();
        editor.elements.canvas.querySelector('[data-status="active"]') && editor.elements.canvas.querySelector('[data-status="active"]').removeAttribute("data-status");
        activeElm.setAttribute("data-status", "active");
        return activeElm;
      },
      updateStyles: () => {

      },
      updateAttrs: (activeElm) => {
        let tag = config.currentElm.tagName;
        let html = "";
        for (let i in elements) {
          if ((new RegExp(i, "i")).test(tag)) {
            for (let j in elements[i]) {
              if (elements[i].hasOwnProperty(j)) {
                html += `<div class="input-group">`;
                html += `<label>${j.replace("-", " ")}</label>`;
                html += `<input name="${j}" value="${activeElm.getAttribute(j) || ""}" type="text" />`;
                html += `</div>`;
              }
            }
          }
        }
        editor.tabs.attributes_tab.panel.innerHTML = html;
      }
    },
    panels: {
      createInput: (p, i) => {
        let html = "", value = p[i], attributes = "";
        if (Array.isArray(value)) {
          html += `<select name="${i}">${value.map(o => `<option value="${o}">${o.replace("-", " ")}</option>`).join("")}</select>`;
        } else if (!isNaN(value)) {
          if (String(value).indexOf(".") !== -1) {
            attributes = `step=".${"0".repeat(String(value).split(".")[1].length - 1)}1"`;
          }
          html += `<input value="${value}" type="number" ${attributes}/>`;
        } else if (typeof value === "string") {
          const unit_regex = new RegExp(config.units.join("|"), "g");
          let unit = "";
          let type = value.indexOf("#") === 0 ? "color" : "text";
          let num = value.replace(unit_regex, "");
          if (!isNaN(num)) {
            unit = value.match(unit_regex) ? value.match(unit_regex)[0] : "none";
            attributes += `class="has-units" `;
            if (num.indexOf(".") !== -1) {
              attributes += `step=".${"0".repeat(num.split(".")[1].length - 1)}1"`;
            }
            value = num;
            type = "number";
          }
          html += `<input value="${value}" type="${type}" ${attributes}/>`;
          if (type === "number") {
            html += `<select class="units">${config.units.map(u => `<option value="${u}" ${(u === unit) ? "selected" : ""}>${u}</option>`)}</select>`;
          }
        }
        return html;
      },
      addTab: function (id, name, html) {
        let panel = document.createElement("div");
        let tab = document.createElement("button");
        tab.id = id;
        tab.textContent = name;
        tab.onclick = () => {
          document.querySelector(".editor_active") && document.querySelector(".editor_active").classList.remove("editor_active");
          panel.classList.add("editor_active");
        };
        editor.elements.tab_buttons.appendChild(tab);
        panel.classList.add("editor_panel");
        panel.innerHTML = html;
        editor.elements.tab_panels.appendChild(panel);
        return editor.tabs[id] = {
          tab: tab,
          panel: panel
        };
      }
    },
    create: function () {
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
        ${Object.keys(p).map(i => `<div class="input-group">
          <label>${i.replace("-", " ")}</label>
          ${this.panels.createInput(p, i)}
          </div>`).join("")}
        </div>`).join(""));
      this.panels.addTab("attributes_tab", "Attributes", "").tab.click();
      this.panels.addTab("blocks_tab", "Blocks", config.blocks.map(b => `
        <div class="block">
          <h5>${b.id}</h5>
          <code>${b.html.replace(/</g, "&lt;")}</code>
        </div>`).join(""));
      this.canvas.setAsActive(document.querySelector("[data-id='0']"));
    }
  };

  editor.create();
  console.log(editor);
  return editor;
})();
