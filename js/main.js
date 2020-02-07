import {elements} from './elements.js';
import {styles} from './styles.js';
//import {template} from './email.js';
import {modal} from './modal.js';

var dt = (function () {
  "use strict";

  let config = {
    node: document.getElementById("design_tool"),
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
    canvas: {
      create: function() {
        editor.canvas.node = document.createElement("div");
        editor.canvas.node.id = "canvas";
        editor.canvas.node.innerHTML = config.template;
        config.node.appendChild(editor.canvas.node);
        editor.canvas.node.addEventListener("click", this.getActiveClick);
        editor.canvas.node.addEventListener("keyup", this.getActiveKey);
        editor.canvas.node.querySelectorAll("*").forEach((elm, index) => {
          elm.setAttribute("data-id", String(index));
        });
        return canvas;
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
        editor.canvas.node.querySelector('[data-status="active"]') && canvas.querySelector('[data-status="active"]').removeAttribute("data-status");
        activeElm.setAttribute("data-status", "active");
        return activeElm;
      },
      updateStyles: () => {

      },
      updateAttrs: (activeElm) => {
        config.elms.attrs.textContent = "";
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
        config.elms.attrs.innerHTML = html;
      }
    },
    panels: {
      createInput: (p, i) => {
        let html = "";
        let value = p[i];
        let attributes = "";
        if (Array.isArray(value)) {
          html += `<select name="${i}">${value.map(o => `<option value="${o}">${o.replace("-", " ")}</option>`).join("")}</select>`;
        } else if (!isNaN(value)) {
          if (String(value).indexOf(".") !== -1) {
            attributes = `step=".${"0".repeat(String(value).split(".")[1].length - 1)}1"`;
          }
          html += `<input value="${value}" type="number" ${attributes}/>`;
        } else if (typeof value === "string") {
          const units = ["px", "%", "em", "vmax", "vmin", "vh", "vw", "none"];
          const unit_regex = new RegExp(units.join("|"), "g");
          let unit = "";
          let type = "text";
          let num = value.replace(unit_regex, "");
          if (value.indexOf("#") === 0) type = "color";
          else if (!isNaN(num)) {
            if (value.match(unit_regex)) unit = value.match(unit_regex)[0];
            else unit = "none";
            attributes += `class="has-units" `;
            if (num.indexOf(".") !== -1) {
              attributes += `step=".${"0".repeat(num.split(".")[1].length - 1)}1"`;
            }
            value = num;
            type = "number";
          }
          html += `<input value="${value}" type="${type}" ${attributes}/>`;
          if (type === "number") {
            html += `<select class="units">${units.map(u => `<option value="${u}" ${(u === unit) ? "selected" : ""}>${u}</option>`)}</select>`;
          }
        }
        return html;
      }
    },
    create: function () {
      editor.canvas.create();
      let tabs = {};
      let addTab = (id, name, panel) => {
        let tab = document.createElement("button");
        tab.id = id;
        tab.textContent = name;
        tab.onclick = () => {
          document.querySelector(".editor_active") && document.querySelector(".editor_active").classList.remove("editor_active");
          panel.classList.add("editor_active");
        };
        tab_buttons.appendChild(tab);
        panel.classList.add("editor_panel");
        tab_panels.appendChild(panel);
        return tabs[id] = {
          id: id,
          tab: tab,
          panel: panel
        };
      };
      let editor_elm = document.createElement("div");
      editor_elm.id = "editor";
      config.node.appendChild(editor_elm);
      let tab_buttons = document.createElement("div");
      tab_buttons.id = "tab_buttons";
      editor_elm.appendChild(tab_buttons);
      let tab_panels = document.createElement("div");
      tab_panels.id = "tab_panels";
      editor_elm.appendChild(tab_panels);
      const panels_wrap = document.createElement("div");
      panels_wrap.id = "panels";
      styles.forEach(p => {
        let panel = document.createElement("div");
        panel.className = "panel";
        let html = `<h2>${p.id}</h2>`;
        for (let i in p) {
          if (i !== "id" && p.hasOwnProperty(i)) {
            html += `<div class="input-group">
          <label>${i.replace("-", " ")}</label>
          ${this.panels.createInput(p, i)}
          </div>`;
          }
        }
        panel.innerHTML = html;
        panels_wrap.appendChild(panel);
      });
      addTab("styles_tab", "Styles", panels_wrap);
      config.elms.attrs = document.createElement("div");
      addTab("attributes_tab", "Attributes", config.elms.attrs);
      tabs.attributes_tab.tab.click();
      this.canvas.setAsActive(document.querySelector("[data-id='0']"))
      let blocks_elm = document.createElement("div");
      let html = "";
      config.blocks.forEach(b => {
        html += `<div class="block">
        <h5>${b.id}</h5>
        <code>${b.html.replace(/</g, "&lt;")}</code>
      </div>`;
      });
      blocks_elm.innerHTML = html;
      addTab("blocks_tab", "Blocks", blocks_elm);

      return {
        editor: editor_elm,
        tabs: tabs
      }
    }
  };

  editor.create();
  console.log(editor);
  return editor;
})();
