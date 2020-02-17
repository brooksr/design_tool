import {elements} from './elements.js';
import {styles} from './styles.js';
import {drag} from './drag.js';
import {config} from './config.js';
import {components} from './components.js';
import {email_components} from './email_components.js';
"use strict";

window.editor = (function () {
  let editor = {
    s: styles,
    styles: [],
    elms: {},
    update: function(i){
      editor.doc.body.innerHTML = "";
      editor.elms.canvas.srcdoc = config.templates[i].html;
      if (document.getElementById("menu_close") != null) document.getElementById("menu_close").click();
    },
    save: function () {
      localStorage.setItem("editor-01", encodeURIComponent(editor.doc.documentElement.outerHTML));
      alert("Saved!");
    },
    addBlock: function(self){
      var txt = document.createElement("textarea");
      txt.innerHTML = self.querySelector("code").innerHTML;
      editor.elms.active.outerHTML += txt.value;
      editor.updateIds();
      //editor.setAsActive(e.target);
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
      var selectors = event.currentTarget.querySelectorAll("[name='selector']");
      var selector = selectors[0].value;
      var sheet = editor.sheets[0];
      //let newRule = event.currentTarget.querySelector("textarea").value;
      let newRule = "";
      if (selectors.length > 1) {
        /*newRule = Array.from(event.currentTarget.querySelectorAll("textarea")).map(t => {
          return t.getAttribute("data-selector") + " {" + t.value + "}"
        }).join(" ");*/
        event.currentTarget.querySelectorAll(".css-line").forEach(line => {
          newRule += line.querySelector("[name='property']").value + ": " + line.querySelector("[name='value']").value + ";";
        });
      } else {
        event.currentTarget.querySelectorAll(".css-line").forEach(line => {
          newRule += line.querySelector("[name='property']").value + ": " + line.querySelector("[name='value']").value + ";";
        });
      }
      sheet.deleteRule(ind);
      sheet.insertRule(selector + " {" + newRule + "}", ind);
    },
    emailify: function(){
      let doc = editor.doc;
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
      e.target !== editor.elms.active ? editor.setAsActive(e.target) : editor.elms.active;
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
        editor.setAsActive(activeElm)
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
        editor.setAsActive(editor.elms.active.previousElementSibling);
      } else if (dir === "down" && editor.elms.active.nextElementSibling != null) {
        editor.setAsActive(editor.elms.active.nextElementSibling);
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
    createStyleForm: function(rule, index){
      if (rule.conditionText) {
        return `<form data-index="${index}" data-selector="@media ${rule.conditionText}" onchange="editor.replaceCss(event)">
            <h4>When ${rule.conditionText.substring(rule.conditionText.indexOf("(") + 1, rule.conditionText.indexOf(")"))}</h4>
            ${Array.from(rule.cssRules).map(function(rule, index){
          let text = rule.cssText.substring(rule.cssText.indexOf("{") + 1, rule.cssText.indexOf("}")).replace(/;/g, ";\n");
          return `<div class="input-group">
                <input name="selector" type="text" value="${rule.selectorText}" />
                ${text.trim().split(";").filter(Boolean).map(r => {
                  let prop = r.trim().split(":")[0].trim();
                  let value = r.trim().split(":")[1].trim();
                  return `
                    <div class="css-line">
                      <input name="property" type="text" value="${prop}" autocomplete="off" />
                      <input name="value" type="text" value="${value}" autocomplete="off" />
                    </div>
                `}).join("")}
              </div>`;
        }).join("")}
          </form>`;
      }
      let matches = editor.doc.querySelectorAll(rule.selectorText);
      let text = rule.cssText.substring(rule.cssText.indexOf("{") + 1, rule.cssText.indexOf("}")).replace(/;/g, ";\n");
      return `<form class="${matches.length > 0 ? "doc_has_match" : "hidden"} ${Array.from(matches).indexOf(editor.elms.active) != -1 ? "matches_active" : ""}" data-index="${index}" data-selector="${rule.selectorText}" onchange="editor.replaceCss(event)">
          <div class="input-group">
          <input name="selector" type="text" value="${rule.selectorText}" />
          ${text.trim().split(";").filter(Boolean).map(r => {
            let prop = r.trim().split(":")[0].trim();
            let value = r.trim().split(":")[1].trim();
            return `
            <div class="css-line">
              <input name="property" type="text" value="${prop}" autocomplete="off" pattern="${editor.properties.join("|")}"/>
              <input name="value" type="text" value="${value}" autocomplete="off" />
            </div>
          `}).join("")}
          </div>
        </form>`;
    },
    updateStyles: () => {
      let sheets = editor.doc.styleSheets;
      editor.sheets = Array.from(sheets).filter(s => s.title !== "editor");
      editor.styles = [];
      editor.sheets.forEach(sheet => {
        if (!!sheet.href) return;
        editor.styles = editor.styles.concat(Array.from(sheet.rules));
      });
      console.log(editor.sheets);
      document.querySelector(".styles_tab").innerHTML = `
        <h2>Styles</h2>
        ${editor.styles.map(editor.createStyleForm).reverse().join("")}
      `;
    },
    updateIds: () => {
      editor.doc.body.querySelectorAll("*:not(style):not(script)").forEach((elm, index) => {
        editor.setContentEditable(elm);
        //editor.drag.init(elm);
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
      editor.updateIds();
    },
    moveDown: () => {
      let move;
      if (editor.elms.active.nextElementSibling != null && editor.elms.active.nextElementSibling.nextElementSibling != null) {
        move = editor.elms.active.nextElementSibling.nextElementSibling;
        move.parentNode.insertBefore(editor.elms.active, move);
      } else if (editor.elms.active.nextElementSibling != null && editor.elms.active.parentNode != null) {
        editor.elms.active.parentNode.appendChild(editor.elms.active);
      }
      editor.updateIds();
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
      document.querySelector(".attributes_tab").innerHTML = html;
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
          if (e.target.value === "mobile") {
            editor.elms.canvas.style.maxWidth = "375px";
            editor.elms.canvas.style.maxHeight = "667px";
          } else if (e.target.value === "tablet") {
            editor.elms.canvas.style.maxWidth = "768px";
            editor.elms.canvas.style.maxHeight = "1024px";
          } else {
            editor.elms.canvas.style.maxWidth = "";
            editor.elms.canvas.style.maxHeight = "";
          }
        });//peechSynthesis.speak(new SpeechSynthesisUtterance($0.textContent))
        document.querySelector("#speak").addEventListener("click", function (e) {
          speechSynthesis.speak(new SpeechSynthesisUtterance(editor.doc.body.textContent))
        });
        document.querySelector("#fullScreen").addEventListener("click", function (e) {
          config.node.requestFullscreen();
        });
        document.querySelector("#zoomIn").addEventListener("click", function (event) {
          let transform = getComputedStyle(editor.doc.body).transform.split("(")[1].split(",")[0];
          let newT = Number(transform) + 0.25;
          editor.doc.body.style.transform = `matrix(${newT}, 0, 0, ${newT}, 0, 0)`;
        });
        document.querySelector("#zoomO").addEventListener("click", function (event) {
          editor.doc.body.style.transform = `matrix(1, 0, 0, 1, 0, 0)`;
        });
        document.querySelector("#zoomOut").addEventListener("click", function (event) {
          let transform = getComputedStyle(editor.doc.body).transform.split("(")[1].split(",")[0];
          let newT = Number(transform) - 0.25;
          editor.doc.body.style.transform = `matrix(${newT}, 0, 0, ${newT}, 0, 0)`;
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
          editor.doc.body.classList.toggle("no-outline");
        });
        document.querySelector("#emailInline").addEventListener("click", function (event) {
          var innerHTML = editor.doc.documentElement.innerHTML;
          for (let c in email_components) {
            innerHTML = innerHTML.replace(new RegExp(c, "g"), email_components[c]);
          }
          editor.doc.documentElement.innerHTML = innerHTML;
          editor.emailify();
          var html = editor.doc.documentElement.innerHTML.replace(/<tbody>|<\/tbody>/g, "");
          editor.cm.setValue(html)
        });
      },
    },
    onload: function(){
      editor.doc = editor.elms.canvas.contentDocument;
      editor.elms.canvas_style = document.createElement("style");
      editor.elms.canvas_style.title = "editor";
      editor.elms.canvas_style.innerHTML = components.editor_css;
      editor.doc.head.appendChild(editor.elms.canvas_style);

      editor.doc.body.addEventListener("click", editor.getActiveClick);
      editor.doc.body.addEventListener("keyup", editor.getActiveKey);
      editor.updateIds();

      document.addEventListener("keydown", editor.shortcuts);
      editor.doc.addEventListener("keydown", editor.shortcuts);

      editor.setAsActive(editor.doc.querySelector("div"));
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

      let printTags = (e, s) => {
        let html = !!e.selfClosing ? `<${s} />` : `<${s}>placeholder</${s}>`;
        if (!!e.droppable) {
          html = `<${s}><${e.droppable}>placeholder</${e.droppable}></${s}>`;
        }
        return html;
      };
      
      editor.properties = Object.keys(Object.assign(...editor.s)).filter(p => p != "id");
      editor.elms.editor = document.createElement("div");
      editor.elms.editor.id = "editor";
      editor.elms.editor.innerHTML = `<div id="tab_panels">
          <div class="editor_panel edit_tab editor_active">
            <div class="attributes_tab"></div>
            <div class="styles_tab"></div>
            <ul id="hint">${editor.properties.map(style => {
              return `<li onclick="editor.activeInput.value = event.target.textContent;">${style}</li>`;
            }).join("")}</ul>
          </div>
          <div class="editor_panel blocks_tab">
            <h4>Custom Blocks</h4>
            ${config.blocks.map(b => `
            <div class="block" onclick="editor.addBlock(this)">
              <h5>${b.id}</h5>
              <code id="${b.id}" draggable="true">${b.html}</code>
            </div>`).join("")}

            <h4>Elements</h4>
            ${Object.keys(elements).map(b => `
            <div class="block" onclick="editor.addBlock(this)">
              <h5>${b}</h5>
              <code draggable="true">${printTags(elements[b], b)}</code>
            </div>`).join("")}

          </div>
        </div>`;
      config.node.appendChild(editor.elms.editor);
      document.querySelector(".attributes_tab").onchange = editor.bindAttributes;
      document.querySelector(".styles_tab").onkeyup = function(event){
        if (event.target.tagName === "INPUT" && event.target.name === "property") {
          window.editor.activeInput = event.target;
          window.editor.activeInput.onblur = function(){
            setTimeout(() => {
              hint.querySelectorAll("li").forEach(function(li){
                li.style.height = 0;
              });
            }, 100);
          }
          let hint = document.getElementById("hint");
          hint.style.top = event.target.getBoundingClientRect().bottom + "px";
          hint.style.left = event.target.getBoundingClientRect().left + "px";
          hint.style.width = event.target.getBoundingClientRect().width + "px";
          hint.querySelectorAll("li").forEach(function(li){
            li.style.height = li.textContent != event.target.value && li.textContent.indexOf(event.target.value) !== -1  ? "15px" : 0;
          });
        }
      };

      return this;
    }
  };
  return {
    config: config,
    ...editor.create()
  };
})();
console.log(editor);
