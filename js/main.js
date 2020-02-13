import {elements} from './elements.js';
import {styles} from './styles.js';
import {drag} from './drag.js';
import {config} from './config.js';
import {components} from './components.js';
"use strict";

window.editor = (function () {
  let editor = {
    styles: [],
    tabs: {},
    elms: {},
    update: function(i){
      editor.elms.canvas.contentDocument.body.innerHTML = "";
      editor.elms.canvas.srcdoc = config.templates[i].html;
      if (document.getElementById("menu_close") != null) document.getElementById("menu_close").click();
    },
    save: function () {
      localStorage.setItem("editor-01", encodeURIComponent(editor.elms.canvas.contentDocument.documentElement.outerHTML));
      alert("Saved!");
    },
    addBlock: function(self){
      var txt = document.createElement("textarea");
      txt.innerHTML = self.querySelector("code").innerHTML;
      editor.elms.active.outerHTML += txt.value;
      editor.canvas.updateIds();
      //editor.canvas.setAsActive(e.target);
    },
    shortcuts: function(event) {
      let save = event.which === 83 && event.ctrlKey;
      if (save) {
        event.preventDefault();
        editor.save();
      }
    },
    emailify: function(){
      var inlinable = Array.from(editor.elms.canvas.contentDocument.styleSheets).filter(s => s.title === "inlineCSS")[0];
      var remove = editor.elms.canvas.contentDocument.querySelectorAll("[title='inlineCSS'], [title='editor']");
      remove.forEach(function(s){
        s.parentNode.removeChild(s);
      });
      var all = editor.elms.canvas.contentDocument.querySelectorAll("*");
      all.forEach(function(m){
        m.removeAttribute("data-id");
        if (m.isContentEditable) m.removeAttribute("contenteditable");
        if (m.tagName == "TABLE") {
          m.setAttribute("cellpadding", 0);
          m.setAttribute("cellspacing", 0);
        }
        if (m.tagName == "A") {
          m.setAttribute("target", "_blank");
        }
      });
      Array.from(inlinable.rules).forEach(function(rule){
        var matches = editor.elms.canvas.contentDocument.querySelectorAll(rule.selectorText);
        var style = rule.style.cssText.split(";");
        matches.forEach(function(m){
          //set attrs
          style.forEach(function(s){
              if (s.indexOf(": ") == -1) return;
              // set style
              var r = s.trim().split(": ");
              if (r.length === 0) alert(r)
              var prop = r[0], value = r[1];
              m.style[prop] = value;
              if (["border", "height", "width", "max-height", "max-width"].indexOf(prop) != -1 && (m.tagName == "TD" || m.tagName == "TABLE" || m.tagName == "IMG")) {
                m.setAttribute(prop.replace("max-", ""), value.replace("px", "").replace("none", "0"));
              }
          });
        });
      });
    },
    canvas: {
      drag: drag,
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
      getActiveClick: function (e) {
        e.target !== editor.elms.active ? editor.canvas.setAsActive(e.target) : editor.elms.active;
      },
      getActiveKey: function () {
        let sel = editor.elms.canvas.contentWindow.getSelection();
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
        if (editor.elms.active !== activeElm) {
          editor.canvas.setAsActive(activeElm)
        }
        return activeElm;
      },
      setAsActive:  function(activeElm) {
        editor.elms.active = activeElm;
        console.log(activeElm);
        this.updateAttrs(activeElm);
        this.updateStyles();
        editor.elms.canvas.contentDocument.querySelector('[data-status="active"]') && editor.elms.canvas.contentDocument.querySelector('[data-status="active"]').removeAttribute("data-status");
        activeElm.setAttribute("data-status", "active");
        return activeElm;
      },
      changeActive: (dir) => {
        let currentId = Number(editor.elms.active.getAttribute("data-id"));
        let sibling;
        if (dir === "up") {
          if (currentId === "0") return alert("First element, can't move up.")
          sibling = editor.elms.canvas.contentDocument.querySelector("[data-id='"+(currentId - 1)+"']");
          editor.canvas.setAsActive(sibling);
        } else {
          sibling = editor.elms.canvas.contentDocument.querySelector("[data-id='"+(currentId + 1)+"']");
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
        editor.elms.active.style[e.target.name] = e.target.value;
      },
      updateStyles: () => {
        let sheets = editor.elms.canvas.contentDocument.styleSheets;
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
              elements: editor.elms.canvas.contentDocument.querySelectorAll(rule.selectorText)
            }
          }));
        });

        console.log(editor.styles);
        var currentStyles = getComputedStyle(editor.elms.active);
        var styleInputs = document.querySelectorAll(".styles_tab input");
        styleInputs.forEach(input => {
          var value = currentStyles[input.name];
          if (value.indexOf("rgba") === 0) value = editor.canvas.rgbToHex(value);
          input.value = value;
        });
      },
      updateIds: () => {
        editor.elms.canvas.contentDocument.body.querySelectorAll("*:not(style):not(script)").forEach((elm, index) => {
          elm.setAttribute("data-id", String(index));
          editor.canvas.setContentEditable(elm);
          //editor.canvas.drag.init(elm);
        });
      },
      moveUp: () => {
        let currentId = Number(editor.elms.active.getAttribute("data-id"));
        if (currentId === "0") return alert("First element, can't move up.")
        let sibling = editor.elms.canvas.contentDocument.querySelector("[data-id='"+(currentId - 1)+"']");
        sibling.parentNode.insertBefore(editor.elms.active, sibling);
        editor.canvas.updateIds();
      },
      moveDown: () => {
        //let currentId = Number(editor.elms.active.getAttribute("data-id"));
        //let sibling = editor.elms.canvas.contentDocument.querySelector("[data-id='"+(currentId + 1)+"']");
        //return alert("Last element, can't move down.")
        if (editor.elms.active.nextElementSibling && editor.elms.active.nextElementSibling.nextElementSibling) {
          editor.elms.active.parentNode.insertBefore(editor.elms.active, editor.elms.active.nextElementSibling.nextElementSibling);
        } else if (editor.elms.active.nextElementSibling && editor.elms.active.nextElementSibling.parentNode) {
          editor.elms.active.parentNode.appendChild(editor.elms.active, editor.elms.active.nextElementSibling.parentNode);
        } else if (editor.elms.active.parentNode.nextElementSibling && editor.elms.active.nextElementSibling.parentNode) {
          editor.elms.active.parentNode.appendChild(editor.elms.active, editor.elms.active.nextElementSibling.parentNode);
        }
        editor.canvas.updateIds();
      },
      bindAttributes:  e => editor.elms.active.setAttribute(e.target.name, e.target.value),
      updateAttrs: (activeElm) => {
        let tag = editor.elms.active.tagName.toLowerCase();
        let html = `<h2>Attributes</h2>`;
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
      },
    },
    toolbar: {
      create: function(){
        editor.elms.toolbar = document.createElement("div");
        editor.elms.toolbar.id = "toolbar";
        editor.elms.toolbar.innerHTML = components.toolbar;
        config.node.appendChild(editor.elms.toolbar);
        document.querySelector("#openMenu").addEventListener("click", function (event) {
          editor.elms.menu = document.createElement("div");
          editor.elms.menu.classList.add("left_area", "cm_wrap", "modal", "menu");
          editor.elms.menu.innerHTML = components.menu(config.templates);
          config.node.appendChild(editor.elms.menu);
          document.querySelector("#save").addEventListener("click", editor.save);
          document.querySelector("#manageImages").addEventListener("click", function (event) {
            editor.elms.modal = document.createElement("div");
            editor.elms.modal.classList.add("left_area", "cm_wrap", "modal", "images");
            editor.elms.modal.innerHTML = components.modal(config.images);
            config.node.appendChild(editor.elms.modal);
            document.getElementById("modal_close").addEventListener("click", function (event) {
              editor.elms.modal.parentNode.removeChild(editor.elms.modal);
            });
          });
          document.getElementById("menu_close").addEventListener("click", function (event) {
            editor.elms.menu.parentNode.removeChild(editor.elms.menu);
          });
        });
        document.querySelector("#device-view").addEventListener("change", function (e) {
          if (e.target.value == "mobile") {
            editor.elms.canvas.style.maxWidth = "375px";
            editor.elms.canvas.style.maxHeight = "667px";
          } else if (e.target.value == "tablet") {
            editor.elms.canvas.style.maxWidth = "768px";
            editor.elms.canvas.style.maxHeight = "1024px";
          } else {
            editor.elms.canvas.style.maxWidth = "";
            editor.elms.canvas.style.maxHeight = "";
          }
        });
        document.querySelector("#fullScreen").addEventListener("click", function (e) {
          config.node.requestFullscreen();
        });
        document.querySelector("#zoomIn").addEventListener("click", function (event) {
          let transform = getComputedStyle(editor.elms.canvas.contentDocument.body).transform.split("(")[1].split(",")[0];
          let newT = Number(transform) + 0.25;
          editor.elms.canvas.contentDocument.body.style.transform = `matrix(${newT}, 0, 0, ${newT}, 0, 0)`;
        });
        document.querySelector("#zoomO").addEventListener("click", function (event) {
          editor.elms.canvas.contentDocument.body.style.transform = `matrix(1, 0, 0, 1, 0, 0)`;
        });
        document.querySelector("#zoomOut").addEventListener("click", function (event) {
          let transform = getComputedStyle(editor.elms.canvas.contentDocument.body).transform.split("(")[1].split(",")[0];
          let newT = Number(transform) - 0.25;
          editor.elms.canvas.contentDocument.body.style.transform = `matrix(${newT}, 0, 0, ${newT}, 0, 0)`;
        });
        document.querySelector("#editor-view").addEventListener("change", function (event) {
          editor.elms.cm.style.display = (event.target.value == "code") ? "block" : "none";
          editor.cm.refresh();
          document.body.classList.toggle("editor_open");
        });
        document.querySelector("#styles-tabs").addEventListener("change", function (event) {
          document.querySelector(".editor_active") && document.querySelector(".editor_active").classList.remove("editor_active");
          document.querySelector("." + event.target.value + "_tab").classList.add("editor_active");
        });
        document.querySelector("#toggleOutlines").addEventListener("click", function (event) {
          editor.elms.canvas.contentDocument.body.classList.toggle("no-outline");
        });
        document.querySelector("#emailInline").addEventListener("click", function (event) {
          editor.emailify()
          var html = editor.elms.canvas.contentDocument.documentElement.outerHTML;
          editor.cm.setValue(html)
        });
      },
    },
    onload: function(){
      editor.elms.canvas_style = document.createElement("style");
      editor.elms.canvas.contentDocument.head.appendChild(editor.elms.canvas_style);
      editor.elms.canvas_style.title = "editor";
      editor.elms.canvas_style.innerHTML = components.editor_css;

        editor.elms.canvas.contentDocument.body.addEventListener("click", editor.canvas.getActiveClick);
        editor.elms.canvas.contentDocument.body.addEventListener("keyup", editor.canvas.getActiveKey);
        editor.elms.canvas.contentDocument.body.querySelectorAll("*:not(style):not(script)").forEach((elm, index) => {
          elm.setAttribute("data-id", String(index));
          editor.canvas.setContentEditable(elm);
          //editor.canvas.drag.init(elm);
        });

        document.addEventListener("keydown", editor.shortcuts);
        editor.elms.canvas.contentDocument.addEventListener("keydown", editor.shortcuts);

        editor.canvas.setAsActive(editor.elms.canvas.contentDocument.querySelector("[data-id='0']"));
    },
    create: function () {
      editor.toolbar.create();

      editor.elms.canvas = document.createElement("iframe");
      editor.elms.canvas.id = "canvas";
      editor.elms.canvas.srcdoc = config.template;
      config.node.appendChild(editor.elms.canvas);
      editor.elms.canvas.onload = editor.onload;

      editor.elms.cm = document.createElement("div");
      editor.elms.cm.style.display = "none";
      editor.elms.cm.classList.add("cm_wrap");
      config.node.appendChild(editor.elms.cm);
      editor.cm = CodeMirror(editor.elms.cm, {
        value: config.template,
        lineNumbers: true,
        theme: "darcula",
        mode: "htmlmixed"
      });

      editor.elms.editor = document.createElement("div");
      editor.elms.editor.id = "editor";
      config.node.appendChild(editor.elms.editor);

      editor.elms.tab_panels = document.createElement("div");
      editor.elms.tab_panels.id = "tab_panels";
      editor.elms.editor.appendChild(editor.elms.tab_panels);

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
      editor.elms.tab_panels.appendChild(editor.tabs[id]);
      document.querySelector(".styles_tab").onchange = editor.canvas.bindStyles;

      id = "attributes_tab";
      editor.tabs[id] = document.createElement("div");
      editor.tabs[id].classList.add("editor_panel", "editor_active", id);
      editor.elms.tab_panels.appendChild(editor.tabs[id]);
      document.querySelector(".attributes_tab").onchange = editor.canvas.bindAttributes;

      let printTags = (e, s) => {
        let html = !!e.selfClosing ? `<${s} />` : `<${s}>placeholder</${s}>`;
        if (!!e.droppable) {
          html = `<${s}><${e.droppable}>placeholder</${e.droppable}></${s}>`;
        }
        return html.replace(/</g, "&lt;");
      };
      id = "blocks_tab";
      html = "<h4>Custom Blocks</h4>";
      html += config.blocks.map(b => `
        <div class="block" onclick="editor.addBlock(this)">
          <h5>${b.id}</h5>
          <code draggable="true">${b.html.replace(/</g, "&lt;")}</code>
        </div>`).join("");
      html += "<h4>Elements</h4>";
      html += Object.keys(elements).map(b => `
        <div class="block" onclick="editor.addBlock(this)">
          <!--<h5>${b}</h5>-->
          <code draggable="true">${printTags(elements[b], b)}</code>
        </div>`).join("");
      editor.tabs[id] = document.createElement("div");
      editor.tabs[id].innerHTML = html;
      editor.tabs[id].classList.add("editor_panel", id);
      editor.elms.tab_panels.appendChild(editor.tabs[id]);

      return this;
    }
  };
  return {
    config: config,
    ...editor.create()
  };
})();
console.log(editor);
