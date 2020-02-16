import {elements} from './elements.js';
import {styles} from './styles.js';
import {drag} from './drag.js';
import {config} from './config.js';
import {components} from './components.js';
import {email_components} from './email_components.js';
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
    replaceCss: (event) => {
      var ind = event.currentTarget.getAttribute("data-index");
      var selector = event.currentTarget.getAttribute("data-selector");
      var sheet = editor.sheets[0];
      let newRule = event.currentTarget.querySelector("textarea").value;
      if (event.currentTarget.querySelectorAll("textarea").length > 1) {
        newRule = Array.from(event.currentTarget.querySelectorAll("textarea")).map(t => t.getAttribute("data-selector") + " {" + t.value + "}").join(" ");
      }
      sheet.deleteRule(ind);
      sheet.insertRule(selector + " {" + newRule + "}", ind);
    },
    emailify: function(){
      let doc = editor.elms.canvas.contentDocument;
      let inlinable = Array.from(doc.styleSheets).filter(s => s.title === "inlineCSS")[0];
      let remove = doc.querySelectorAll("[title='inlineCSS'], [title='editor']");
      remove.forEach(function(s){
        s.parentNode.removeChild(s);
      });
      let all = doc.querySelectorAll("*");
      all.forEach(function(elm){
        if (elm.isContentEditable) elm.removeAttribute("contenteditable");
        if (elm.tagName == "TABLE") {
          elm.setAttribute("border", 0);
          elm.setAttribute("cellpadding", 0);
          elm.setAttribute("cellspacing", 0);
          elm.setAttribute("role", "presentation");
        }
        if (elm.tagName === "A") {
          elm.setAttribute("target", "_blank");
        }
      });
      Array.from(inlinable.rules).forEach(function(rule){
        var matches = doc.querySelectorAll(rule.selectorText);
        var style = rule.style.cssText.split(";");
        matches.forEach(function(m){
          //set attrs
          style.forEach(function(s){
              if (s.indexOf(": ") == -1) return;
              // set style
              var r = s.trim().split(": ");
              if (r.length === 0) alert(r)
              var prop = r[0], value = r[1];
              var importance = "";
              if (value.indexOf(" !important") != -1) {
                value = value.replace(" !important", "");
                importance = "important";
              }
              m.style.setProperty(prop, value, importance);
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
        if (hasTextNode) elm.contentEditable = hasTextNode;
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
        return activeElm;
      },
      changeActive: (dir) => {
        if (dir === "up" && editor.elms.active.previousElementSibling != null) {
          editor.canvas.setAsActive(editor.elms.active.previousElementSibling);
        } else if (dir === "down" && editor.elms.active.nextElementSibling != null) {
          editor.canvas.setAsActive(editor.elms.active.nextElementSibling);
        }
      },
      rgbToHex: function(str){
        var numbers = str.match(/\d+/g);
        var toHex = function (rgb) {
          var hex = Number(rgb).toString(16);
          if (hex.length < 2) hex = "0" + hex;
          return hex;
        };
        return "#" + toHex(numbers[0]) + toHex(numbers[1]) + toHex(numbers[2]);
      },
      updateStyles: () => {
        let sheets = editor.elms.canvas.contentDocument.styleSheets;
        editor.sheets = Array.from(sheets).filter(s => s.title !== "editor");
        editor.styles = [];
        editor.sheets.forEach(sheet => {
          if (!!sheet.href) return;
          editor.styles = editor.styles.concat(Array.from(sheet.rules));
        });
        console.log(editor.sheets);
        let createStyleForm = function(rule, index){
          if (rule.conditionText) {
            return `<form data-index="${index}" data-selector="@media ${rule.conditionText}" onchange="editor.replaceCss(event)">
              <h4>When ${rule.conditionText.substring(rule.conditionText.indexOf("(") + 1, rule.conditionText.indexOf(")"))}</h4>
              ${Array.from(rule.cssRules).map(function(m_rule, m_index){
                let m_text = m_rule.cssText.substring(m_rule.cssText.indexOf("{") + 1, m_rule.cssText.indexOf("}")).replace(/;/g, ";\n");
                return `<div class="input-group">
                  <label>${m_rule.selectorText}</label>
                  <textarea rows="${m_text.match(/;/g).length + 1}" data-selector="${m_rule.selectorText}"  data-index="${index + "," + m_index}">${m_text}</textarea>
                </div>`;
            }).join("")}
            </form>`;
          }
          let text = rule.cssText.substring(rule.cssText.indexOf("{") + 1, rule.cssText.indexOf("}")).replace(/;/g, ";\n");
          return `<form data-index="${index}" data-selector="${rule.selectorText}" onchange="editor.replaceCss(event)">
            <div class="input-group">
              <label>${rule.selectorText}</label>
              <textarea rows="${text.match(/;/g).length + 1}" data-index="${index}">${text}</textarea>
            </div>
          </form>`;
        };

        editor.tabs.styles_tab.innerHTML = editor.styles.map(createStyleForm).reverse().join("");
      },
      updateIds: () => {
        editor.elms.canvas.contentDocument.body.querySelectorAll("*:not(style):not(script)").forEach((elm, index) => {
          editor.canvas.setContentEditable(elm);
          //editor.canvas.drag.init(elm);
        });
      },
      moveUp: () => {
        let move;
        if (editor.elms.active.previousElementSibling != null) {
          move = editor.elms.active.previousElementSibling;
        } else if (editor.elms.active.parentNode != null) {
          move = editor.elms.active.parentNode;
        }
        if (move) move.parentNode.insertBefore(editor.elms.active, move);
        editor.canvas.updateIds();
      },
      moveDown: () => {
        let move;
        if (editor.elms.active.nextElementSibling != null && editor.elms.active.nextElementSibling.nextElementSibling != null) {
          move = editor.elms.active.nextElementSibling.nextElementSibling;
          move.parentNode.insertBefore(editor.elms.active, move);
        } else if (editor.elms.active.nextElementSibling != null && editor.elms.active.parentNode != null) {
          editor.elms.active.parentNode.appendChild(editor.elms.active);
        }
        if (move)

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
        });//peechSynthesis.speak(new SpeechSynthesisUtterance($0.textContent))
        document.querySelector("#speak").addEventListener("click", function (e) {
          speechSynthesis.speak(new SpeechSynthesisUtterance(editor.elms.canvas.contentDocument.body.textContent))
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
        document.querySelector("#sidebar-tabs").addEventListener("change", function (event) {
          document.querySelector(".editor_active") && document.querySelector(".editor_active").classList.remove("editor_active");
          document.querySelector("." + event.target.value + "_tab").classList.add("editor_active");
        });
        document.querySelector("#toggleOutlines").addEventListener("click", function (event) {
          editor.elms.canvas.contentDocument.body.classList.toggle("no-outline");
        });
        document.querySelector("#emailInline").addEventListener("click", function (event) {
          var innerHTML = editor.elms.canvas.contentDocument.documentElement.innerHTML;
          for (let c in email_components) {
            innerHTML = innerHTML.replace(new RegExp(c, "g"), email_components[c]);
          }
          editor.elms.canvas.contentDocument.documentElement.innerHTML = innerHTML;
          editor.emailify();
          var html = editor.elms.canvas.contentDocument.documentElement.innerHTML.replace(/<tbody>|<\/tbody>/g, "");
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
          editor.canvas.setContentEditable(elm);
          //editor.canvas.drag.init(elm);
        });

        document.addEventListener("keydown", editor.shortcuts);
        editor.elms.canvas.contentDocument.addEventListener("keydown", editor.shortcuts);

        editor.canvas.setAsActive(editor.elms.canvas.contentDocument.querySelector("div"));
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

      let id = "edit_tab";
      editor.tabs[id] = document.createElement("div");
      editor.tabs[id].classList.add("editor_panel", "editor_active", id);
      editor.tabs["attributes_tab"] = document.createElement("div");
      editor.tabs["attributes_tab"].classList.add("attributes_tab");

      editor.tabs["styles_tab"] = document.createElement("div");
      editor.tabs[id].appendChild(editor.tabs["attributes_tab"]);
      editor.tabs[id].appendChild(editor.tabs["styles_tab"]);

      editor.elms.tab_panels.appendChild(editor.tabs[id]);
      document.querySelector(".attributes_tab").onchange = editor.canvas.bindAttributes;

      let printTags = (e, s) => {
        let html = !!e.selfClosing ? `<${s} />` : `<${s}>placeholder</${s}>`;
        if (!!e.droppable) {
          html = `<${s}><${e.droppable}>placeholder</${e.droppable}></${s}>`;
        }
        return html;
      };
      id = "blocks_tab";
      let html = "<h4>Custom Blocks</h4>";//.replace(/</g, "&lt;")
      html += config.blocks.map(b => `
        <div class="block" onclick="editor.addBlock(this)">
          <h5>${b.id}</h5>
          <code id="${b.id}" draggable="true">${b.html}</code>
        </div>`).join("");
      html += "<h4>Elements</h4>";
      html += Object.keys(elements).map(b => `
        <div class="block" onclick="editor.addBlock(this)">
          <h5>${b}</h5>
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
