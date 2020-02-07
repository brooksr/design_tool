import {elements} from './elements.js';
import {styles} from './styles.js';
import {template} from './email.js';

(function () {
  "use strict";

  let dt = {
    node: document.getElementById("design_tool"),
    template: template,
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

  let create_input = (p, i) => {
    const units = ["px", "%", "em", "vmax", "vmin", "vh", "vw", "none"];
    const unit_regex = new RegExp(units.join("|"), "g");
    let html = "";
    let value = p[i];
    let attributes = "";
    if (Array.isArray(value)) {
      html += `<select name="${i}">${value.map((o, ind) => `<option value="${o}">${o.replace("-", " ")}</option>`).join("")}</select>`;
    } else if (typeof value === "function") {
      //html += create_input(value);
    } else if (!isNaN(value)) {
      if (String(value).indexOf(".") != -1) {
        attributes = `step=".${"0".repeat(String(value).split(".")[1].length - 1)}1"`;
      }
      html += `<input value="${value}" type="number" ${attributes}/>`
    } else if (typeof value === "string") {
      let unit = "";
      let type = "text";
      let num = value.replace(unit_regex, "");
      if (value.indexOf("#") === 0) type = "color";
      else if (!isNaN(num)) {
        if (value.match(unit_regex)) unit = value.match(unit_regex)[0];
        else unit = "none";
        attributes += `class="has-units" `;
        if (num.indexOf(".") != -1) {
          attributes += `step=".${"0".repeat(num.split(".")[1].length - 1)}1"`;
        }
        value = num;
        type = "number";
      }
      html += `<input value="${value}" type="${type}" ${attributes}/>`
      if (type == "number") {
        html += `<select class="units">${units.map(u => `<option value="${u}" ${(u == unit) ? "selected" : ""}>${u}</option>`)}</select>`;
      }
    }

    return html;
  }
  let updateAttrs = (activeElm) => {
    dt.elms.attrs.textContent = "";
    let tag = dt.currentElm.tagName;
    let html = "";
    for (let i in elements) {
      if ((new RegExp(i, "i")).test(tag)) {
        for (let j in elements[i]) {
          html += `<div class="input-group">`;
          html += `<label>${j.replace("-", " ")}</label>`;
          html += `<input name="${j}" value="${activeElm.getAttribute(j) || ""}" type="text" />`
          html += `</div>`;
        }
      }
    }
    dt.elms.attrs.innerHTML = html;
  }
  let updateStyles = () => {

  }
  let setAsActive = activeElm => {
    dt.currentElm = activeElm;
    console.log(activeElm);
    updateAttrs(activeElm);
    updateStyles();
    Array.prototype.forEach.call(canvas.querySelectorAll('*'), elm => elm.removeAttribute("data-status"));
    activeElm.setAttribute("data-status", "active");
    return activeElm;
  }
  let getActiveKey = e => {
    let sel = window.getSelection();
    let range = sel.getRangeAt(0);
    let node = document.createElement('span');
    range.insertNode(node);
    range = range.cloneRange();
    range.selectNodeContents(node);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
    let activeElm = node.parentNode
    node.parentNode.removeChild(node);
    if (dt.currentElm != activeElm) {
      setAsActive(activeElm)
    }
    return activeElm;
  }
  let getActiveClick = e => e.target != dt.currentElm ? setAsActive(e.target) : dt.currentElm;
  let setDrag = (elm) => {
    var hasTextNode = Array.from(elm.childNodes).filter(node => {
      return Array.from(node.childNodes).filter(node => {
        return node.nodeName == "#text" 
        && node.textContent.replace(/\s/g, "") != ""
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
  }
  let createCanvas = () => {
    const canvas = document.createElement("div");
    canvas.id = "canvas";
    canvas.innerHTML = dt.template;
    dt.node.appendChild(canvas);
    canvas.addEventListener("click", getActiveClick);
    canvas.addEventListener("keyup", getActiveKey);
    canvas.querySelectorAll("*").forEach((elm, index) => {
      elm.setAttribute("data-id", index);
      //setDrag(elm);
    });
  };
  let createPanels = () => {
    let editor = document.createElement("div");
    editor.id = "editor"
    let tab_buttons = document.createElement("div");
    tab_buttons.id = "tab_buttons"
    let tab_panels = document.createElement("div");
    tab_panels.id = "tab_panels";
    dt.node.appendChild(editor);
    editor.appendChild(tab_buttons);
    editor.appendChild(tab_panels);

    let add_tab = (id, name, elm) => {
      let tab = document.createElement("button");
      tab.id = id;
      tab.textContent = name;
      tab.onclick = e => {
        Array.from(document.querySelectorAll(".editor_panel")).forEach(p => p.classList.remove("editor_active"));
        elm.classList.add("editor_active");
      }
      tab_buttons.appendChild(tab);
      elm.classList.add("editor_panel");
      tab_panels.appendChild(elm);
    }
    const panels_wrap = document.createElement("div");
    panels_wrap.id = "panels";
    styles.forEach(p => {
      let panel = document.createElement("div");
      panel.className = "panel";
      let html = `<h2>${p.id}</h2>`;
      for (let i in p) {
        if (i != "id") {
          html += `<div class="input-group">
          <label>${i.replace("-", " ")}</label>
          ${create_input(p, i)}
          </div>`;
        }
      }
      panel.innerHTML = html;
      panels_wrap.appendChild(panel);
    });
    add_tab("styles_tab", "Styles", panels_wrap);
    dt.elms.attrs = document.createElement("div");
    dt.elms.attrs.textContent = "Select an element";
    add_tab("attributes_tab", "Attributes", dt.elms.attrs);
    var blocks_elm = document.createElement("div");
    var html = "";
    dt.blocks.forEach(b => {
      html += `<div class="block">
        <h5>${b.id}</h5>
        <code>${b.html.replace(/</g, "&lt;")}</code>
      </div>`;
    });
    blocks_elm.innerHTML = html;
    add_tab("blocks_tab", "Blocks", blocks_elm);
  };
  createCanvas();
  createPanels();
})();
