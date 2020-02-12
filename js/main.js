import {elements} from './elements.js';
import {styles} from './styles.js';
import {blocks} from './blocks.js';
import {email} from './email.js';
import {email2} from './email2.js';
import {modal} from './modal.js';
/*
         <i class="fas fa-desktop"></i>
         <i class="fas fa-heading"></i>
         <i class="fas fa-paragraph"></i>

         <i class="fas fa-remove-format"></i>
         <i class="fas fa-quote-left"></i>
         <i class="fas fa-quote-right"></i>
         <i class="fas fa-vector-square"></i>
         <i class="fas fa-link"></i>
         <i class="fas fa-table"></i>
         <i class="fas fa-copy"></i>
         <i class="fas fa-copyright"></i>
         <i class="fas fa-code"></i>
         <i class="fas fa-fill"></i>
         <i class="fas fa-eye-dropper"></i>
         <i class="fas fa-eye-clone"></i>
         <i class="fas fa-list-ol"></i>
         <i class="fas fa-list-ul"></i>
         <i class="fas fa-th"></i>
         <i class="fas fa-th-large"></i>
         <i class="fas fa-th-list"></i>
         <i class="fas fa-trash"></i>*/
window.editor = (function () {
  "use strict";

  let config = {
    node: document.getElementById("design_tool"),
    units: ["px", "%", "em", "vmax", "vmin", "vh", "vw", "none"],
    template: localStorage.getItem("editor-01") ? decodeURIComponent(localStorage.getItem("editor-01")) : modal,
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
    styles: [],
    tabs: {},
    elms: {},
    update: function(i){
      editor.elms.canvas.contentDocument.body.innerHTML = "";
      editor.elms.canvas.srcdoc = config.templates[i].html;
      if (document.getElementById("menu_close") != null) document.getElementById("menu_close").click();
    },
    save: function () {
      localStorage.setItem("editor-01", encodeURIComponent(editor.elms.canvas.contentDocument.documentElement.innerHTML));
      alert("Saved!");
    },
    addBlock: function(self){
      var txt = document.createElement("textarea");
      txt.innerHTML = self.querySelector("code").innerHTML;
      editor.elms.active.outerHTML += txt.value;
      editor.canvas.updateIds();
      //editor.canvas.setAsActive(e.target);
    },
    shortcut: {
      save: function(event) {
        let s = 83;
        if (event.which === s && event.ctrlKey) {
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
        editor.elms.toolbar = document.createElement("div");
        editor.elms.toolbar.id = "toolbar";
        editor.elms.toolbar.innerHTML = `
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
            <button type="button" onclick="editor.canvas.moveUp()"><i class="fas fa-arrow-up"></i> <span class="tablet-tooltip">Order Up</span></button>
            <button type="button" onclick="editor.canvas.moveDown()"><i class="fas fa-arrow-down"></i> <span class="tablet-tooltip">Order Down</span></button>
            <button type="button" onclick="editor.canvas.changeActive('up')"><i class="far fa-arrow-alt-circle-up"></i> <span class="tablet-tooltip">Focus Up</span></button>
            <button type="button" onclick="editor.canvas.changeActive()"><i class="far fa-arrow-alt-circle-down"></i> <span class="tablet-tooltip">Focus Down</span></button>
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
        config.node.appendChild(editor.elms.toolbar);
        document.querySelector("#openMenu").addEventListener("click", function (event) {
          editor.elms.menu = document.createElement("div");
          editor.elms.menu.classList.add("left_area", "cm_wrap", "modal", "menu");
          editor.elms.menu.innerHTML = `
            <button id="menu_close">&times;</button>
            <button type="button" id="manageImages"><i class="far fa-images"></i> <span class="">Manage Images</span></button>
            <button type="button" id="save"><i class="far fa-save"></i> <span class="">Save</span></button>
            <hr />
            <h3>New</h3>
            <ul>
            ${config.templates.map((i, index) => `<li onclick="editor.update(${index})">
              ${i.icon}
              <h4>${i.name}</h4>
              </li>`).join("")}
            </ul>
            <h3>Open</h3>
            <ul>
            ${config.templates.map((i, index) => `<li onclick="editor.update(${index})">
              ${i.icon}
              <h4>${i.name}</h4>
              </li>`).join("")}
            </ul>
          `;
          config.node.appendChild(editor.elms.menu);
          document.querySelector("#save").addEventListener("click", editor.save);
          document.querySelector("#manageImages").addEventListener("click", function (event) {
            editor.elms.modal = document.createElement("div");
            editor.elms.modal.classList.add("left_area", "cm_wrap", "modal", "images");
            editor.elms.modal.innerHTML = `
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
          editor.elms.canvas.style.maxWidth = e.target.value;
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
        document.querySelector("#show_code").addEventListener("change", function (event) {
          editor.elms.cm.style.display = (event.target.checked) ? "block" : "none";
          editor.cm.refresh();
        });
        document.querySelector("#styles-tabs").addEventListener("change", function (event) {
          document.querySelector(".editor_active") && document.querySelector(".editor_active").classList.remove("editor_active");
          document.querySelector("." + event.target.value + "_tab").classList.add("editor_active");
        });
        document.querySelector("#toggleOutlines").addEventListener("click", function (event) {
          editor.elms.canvas.contentDocument.body.classList.toggle("no-outline");
        });
      },
    },
    onload: function(){
      editor.elms.canvas_style = document.createElement("style");
      editor.elms.canvas.contentDocument.head.appendChild(editor.elms.canvas_style);
      editor.elms.canvas_style.title = "editor";
      editor.elms.canvas_style.innerHTML = `
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

        editor.elms.canvas.contentDocument.body.addEventListener("click", editor.canvas.getActiveClick);
        editor.elms.canvas.contentDocument.body.addEventListener("keyup", editor.canvas.getActiveKey);
        editor.elms.canvas.contentDocument.body.querySelectorAll("*:not(style):not(script)").forEach((elm, index) => {
          elm.setAttribute("data-id", String(index));
          editor.canvas.setContentEditable(elm);
          //editor.canvas.drag.init(elm);
        });

        document.addEventListener("keydown", editor.shortcut.save);
        editor.elms.canvas.contentDocument.addEventListener("keydown", editor.shortcut.save);

        editor.canvas.setAsActive(editor.elms.canvas.contentDocument.querySelector("[data-id='0']"));
    },
    create: function () {
      editor.toolbar.create();

      editor.elms.canvas = document.createElement("iframe");
      editor.elms.canvas.id = "canvas";
      editor.elms.canvas.classList.add("left_area");
      editor.elms.canvas.srcdoc = config.template;
      config.node.appendChild(editor.elms.canvas);
      editor.elms.canvas.onload = editor.onload;

      editor.elms.cm = document.createElement("div");
      editor.elms.cm.style.display = "none";
      editor.elms.cm.classList.add("left_area", "cm_wrap");
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

      editor.elms.tab_buttons = document.createElement("div");
      editor.elms.tab_buttons.id = "tab_buttons";
      editor.elms.editor.appendChild(editor.elms.tab_buttons);

      editor.elms.tab_panels = document.createElement("div");
      editor.elms.tab_panels.id = "tab_panels";
      editor.elms.editor.appendChild(editor.elms.tab_panels);

      let id = "styles_tab";
      /*let html = `
<div class="input-row">
    <div class="input-col">
        <label for="font-family">
          <i class="fas fa-font"></i>
          Font Family
        </label>
        <select id="font-family"><option>Arial</option></select>
    </div>
    <div class="input-col">
        <label for="font-size">
            <i class="fas fa-text-height"></i>
          Font Size
        </label>
        <input id="font-size" type="number" value=""/>
    </div>
    <div class="input-col">
        <label for="line-height">
            <i class="fas fa-text-height"></i>
          Line height
        </label>
        <input id="line-height" type="number" value=""/>
    </div>
    <div class="input-col">
        <label for="letter-spacing">
        <i class="fas fa-text-width"></i>
          Letter Spacing
        </label>
        <input id="letter-spacing" type="number" value=""/>
    </div>
    <div class="input-col">
        <label for="word-spacing">
        <i class="fas fa-text-width"></i>
          Word Spacing
        </label>
        <input id="word-spacing" type="number" value=""/>
    </div>
    <div class="input-col">
        <label for="text-indent">
        <i class="fas fa-text-width"></i>
          text-indent
        </label>
        <input id="text-indent" type="number" value=""/>
    </div>
    <div class="input-col">
        <label for="text-indent">
        <i class="fas fa-text-width"></i>
          text-shadow
        </label>
        <input id="text-indent" type="text" value=""/>
    </div>
    <div class="input-col">
        <label for="text-indent">
        <i class="fas fa-text-width"></i>
          text-decoration
        </label>
        <input id="text-indent" type="text" value=""/>
    </div>
    <div class="input-col">
        <label for="color">
        <i class="fas fa-palette"></i>
          Font Color
        </label>
        <input id="color" type="color" value=""/>
    </div>
    <div class="radio-buttons">
        <input id="font-weight" type="checkbox" value="bold"/>
        <label for="font-weight">
            <i class="fas fa-bold"></i>
            <span class="sr-only">Bold</span>
        </label>

        <input id="font-style" type="checkbox" value="italic"/>
        <label for="font-style">
            <i class="fas fa-italic"></i>
            <span class="sr-only">Italic</span>
        </label>

        <!--<input id="" type="checkbox" value=""/>
        <label for="">
         <i class="fas fa-subscript"></i>
            <span class="sr-only">Subscript</span>
        </label>

        <input id="" type="checkbox" value=""/>
        <label for="">
         <i class="fas fa-superscript"></i>
            <span class="sr-only">Superscript</span>
        </label> -->
    </div>
    <div class="radio-buttons">
        <input name="text-decoration" id="text-decoration_underline" type="radio" value="underline"/>
        <label for="text-decoration_underline">
         <i class="fas fa-underline"></i>
            <span class="sr-only">underline</span>
        </label>

        <input name="text-decoration" id="text-decoration_line-through" type="radio" value="line-through"/>
        <label for="text-decoration_line-through">
         <i class="fas fa-strikethrough"></i>
            <span class="sr-only">strikethrough</span>
        </label>
    </div>
    <div class="radio-buttons">
        <input name="text-align" type="radio" id="text-align-left" value="left"/>
        <label for="text-align-left">
           <i class="fas fa-align-left"></i>
            <span class="sr-only">Align left</span>
        </label>

        <input name="text-align" type="radio" id="text-align-center" value="center"/>
        <label for="text-align-center">
           <i class="fas fa-align-center"></i>
            <span class="sr-only">Align center</span>
        </label>

        <input name="text-align" type="radio" id="text-align-right" value="right"/>
        <label for="text-align-right">
           <i class="fas fa-align-right"></i>
            <span class="sr-only">Alight right</span>
        </label>

        <input name="text-align" type="radio" id="text-align-justify" value="justify"/>
        <label for="text-align-justify">
           <i class="fas fa-align-justify"></i>
            <span class="sr-only">Justify</span>
        </label>
    </div>
    <div class="input-col">
        <label for="text-transform">
          <i class="fas fa-font"></i>
          text-transform
        </label>
        <select id="text-transform"><option>PLACEHOLDER</option></select>
    </div>
    <div class="input-col">
        <label for="font-family">
          <i class="fas fa-font"></i>
          Word wrap
        </label>
        <select id="font-family"><option>PLACEHOLDER</option></select>
    </div>
    <div class="input-col">
        <label for="font-family">
          <i class="fas fa-font"></i>
          White space
        </label>
        <select id="font-family"><option>PLACEHOLDER</option></select>
    </div>
    <div class="input-col">
        <label for="font-family">
          <i class="fas fa-font"></i>
          Text overflow
        </label>
        <select id="font-family"><option>PLACEHOLDER</option></select>
    </div>
</div>
      `;*/
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
        let html = !!e.selfClosing ? `<${s} />` : `<${s}></${s}>`;
        if (!!e.droppable) {
          html = `<${s}><${e.droppable}></${e.droppable}></${s}>`;
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
