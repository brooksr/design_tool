import {styles} from './styles.js';
import {config} from './config.js';
import {components} from './components.js';
import {emailComponents} from './email-components.js';
import {keys} from '../keys.js';

export let editor = (function () {
    let editor = {
        node: document.getElementById("design_tool"),
        s: styles,
        styles: [],
        elms: {},
        properties: Object.keys(Object.assign(...styles)).filter(p => p !== "id"),
        update: function(obj){
            editor.doc.body.innerHTML = "";
            editor.elms.canvas.srcdoc = obj.html;
            document.getElementById("menu_close") && document.getElementById("menu_close").click();
        },
        save: function () {
            let name = document.getElementById("assetName").value;
            let value = {
                html: editor.doc.documentElement.outerHTML,
                name: name,
                icon: '<i class="far fa-envelope"></i>'
            };
            localStorage.setItem(name, JSON.stringify(value));
            alert("Saved!");
        },
        replaceCss: (event) => {
            let ind = event.currentTarget.getAttribute("data-index");
            let selectors = event.currentTarget.querySelectorAll("[name='selector']");
            let selector = event.currentTarget.getAttribute("data-selector");
            let sheet = editor.sheets[0];
            let newRule = "";
            if (selectors.length > 1) {
                event.currentTarget.querySelectorAll(".input-group").forEach(group => {
                    newRule += group.querySelector("[name='selector']").value + " {";
                    group.querySelectorAll(".css-line").forEach(line => {
                        newRule += line.querySelector("[name='property']").value + ": " + line.querySelector("[name='value']").value + ";";
                    });
                    newRule += "}";
                });
            } else {
                event.currentTarget.querySelectorAll(".css-line").forEach(line => {
                    newRule += line.querySelector("[name='property']").value + ": " + line.querySelector("[name='value']").value + ";";
                });
            }
            sheet.deleteRule(ind);
            sheet.insertRule(selector + " {" + newRule + "}", ind);
        },
        cleanup: () => {
            let remove = editor.doc.querySelectorAll("[title='inlineCSS'], [title='editor']");
            let editable = editor.doc.querySelectorAll("[contenteditable]");
            editable.forEach(e => e.removeAttribute("contenteditable"));
            if (editor.elms.active) editor.elms.active.removeAttribute("data-status");
            remove.forEach(function(s){
                s.parentNode.removeChild(s);
            });
            editor.doc.querySelectorAll("[draggable]").forEach(function(e){
                e.setAttribute("draggable", "");
            });
        },
        inlineStyles: function(){
            let inlinable = Array.from(editor.doc.styleSheets).filter(s => s.title === "inlineCSS")[0];
            let all = editor.doc.querySelectorAll("*");
            all.forEach(function(elm){
                if (elm.tagName === "TABLE") {
                    elm.setAttribute("border", "0");
                    elm.setAttribute("cellpadding", "0");
                    elm.setAttribute("cellspacing", "0");
                    elm.setAttribute("role", "presentation");
                }
                if (elm.tagName === "A") {
                    elm.setAttribute("target", "_blank");
                }
            });
            Array.from(inlinable.rules).forEach(function(rule){
                let matches = editor.doc.querySelectorAll(rule.selectorText);
                let style = rule.style.cssText.split(";");
                matches.forEach(function(m){
                    //set attrs
                    style.forEach(function(s){
                        if (s.indexOf(": ") === -1) return;
                        // set style
                        let r = s.trim().split(": ");
                        if (r.length === 0) alert(r);
                        let prop = r[0], value = r[1];
                        let importance = "";
                        if (value.indexOf(" !important") !== -1) {
                            value = value.replace(" !important", "");
                            importance = "important";
                        }
                        // TODO replace rgb with hex
                        m.style.setProperty(prop, value, importance);
                        if (["border", "height", "width", "max-height", "max-width"].indexOf(prop) !== -1 && (m.tagName === "TD" || m.tagName === "TABLE" || m.tagName === "IMG")) {
                            m.setAttribute(prop.replace("max-", ""), value.replace("px", "").replace("none", "0"));
                        }
                    });
                });
            });
        },
        setContentEditable: elm => {
            /*const hasTextNode = Array.from(elm.childNodes).filter(node => {
              return Array.from(node.childNodes).filter(node => {
                return node.nodeName === "#text"
                  && node.textContent.replace(/\s/g, "") !== ""
                  && !node.parentNode.isContentEditable;
              }).length > 0;
            }).length > 0;*/
            const hasTextNode = Array.from(elm.childNodes).filter(node => {
                return node.nodeName === "#text"
                    && node.textContent.replace(/\s/g, "") !== ""
                    && !node.parentNode.isContentEditable;
            }).length > 0;
            if (hasTextNode) elm.contentEditable = hasTextNode;
        },
        setAsActive:  function(activeElm) {
            if (editor.elms.active) editor.elms.active.removeAttribute("data-status");
            editor.elms.active = activeElm;
            editor.elms.active.setAttribute("data-status", "active");
            this.updateAttrs(activeElm);
            this.updateStyles();
            return activeElm;
        },
        rgbToHex: function(str){
            let numbers = str.match(/\d+/g);
            let toHex = function (rgb) {
                let hex = Number(rgb).toString(16);
                if (hex.length < 2) hex = "0" + hex;
                return hex;
            };
            return "#" + toHex(numbers[0]) + toHex(numbers[1]) + toHex(numbers[2]);
        },
        createStyleForm: function(rule, index){
            let outputRule = text => text.trim().split(";").filter(Boolean).map(r => {
                let styles = Object.assign(...editor.s);
                let prop = r.trim().split(":")[0].trim();
                let value = r.trim().split(":")[1].trim();
                //editor.elms.canvas.contentWindow.getComputedStyle(editor.doc.body).getPropertyValue("--overlay-color")
                if (Array.isArray(styles[prop])) {
                    return `
          <div class="css-line">
            <input name="property" type="text" autocomplete="off" value="${prop}" pattern="${editor.properties.join("|")}" />
            <select name="value" autocomplete="off" value="${value}">
              ${styles[prop].map(p => `<option value="${p}" ${p === value ? "selected" : ""}>${p}</option>`).join("")}
            </select>
          </div>`
                }
                return `
        <div class="css-line">
          <input name="property" type="text" autocomplete="off" value="${prop}" pattern="${editor.properties.join("|")}" />
          <input
            name="value" type="text" autocomplete="off"
            value="${value.replace(/"/g, "'")}"
            pattern="${styles[prop]}"
            class="${/^[rgb|hsl|#]/.test(value) ? `rgb` : "nonrgb"}"
            ${/^[rgb|hsl|#]/.test(value) ? `style="background-color:${value};"` : ""}
            />
        </div>`}).join("");

            if (rule.conditionText) {
                return `<form data-index="${index}" data-selector="@media ${rule.conditionText}" onchange="editor.replaceCss(event)" onfocusin="editor.updateMatches(event)" onfocusout="editor.removeMatches(event)">
            <h4>When ${rule.conditionText.substring(rule.conditionText.indexOf("(") + 1, rule.conditionText.indexOf(")"))}</h4>
            ${Array.from(rule.cssRules).map(function(rule, index){
                    let matches = editor.doc.querySelectorAll(rule.selectorText.split(":")[0]);
                    let text = rule.cssText.substring(rule.cssText.indexOf("{") + 1, rule.cssText.indexOf("}")).replace(/;/g, ";\n");
                    return `<div class="input-group ${matches.length > 0 ? "doc_has_match" : "hidden"} ${Array.from(matches).indexOf(editor.elms.active) != -1 ? "matches_active" : ""}">
                <input name="selector" type="text" value="${rule.selectorText}" />
                ${outputRule(text)}
              </div>`;
                }).join("")}
          </form>`;
            } else if (rule.selectorText) {
                let matches = editor.doc.querySelectorAll(rule.selectorText.split(":")[0]);
                let text = rule.cssText.substring(rule.cssText.indexOf("{") + 1, rule.cssText.indexOf("}")).replace(/;/g, ";\n");
                return `<form class="${matches.length > 0 ? "doc_has_match" : "hidden"} ${Array.from(matches).indexOf(editor.elms.active) != -1 ? "matches_active" : ""}" data-index="${index}" data-selector="${rule.selectorText}" onchange="editor.replaceCss(event)" onfocusin="editor.updateMatches(event)" onfocusout="editor.removeMatches(event)">
            <div class="input-group">
            <input name="selector" type="text" value="${rule.selectorText}" />
            ${outputRule(text)}
            </div>
          </form>`;
            }
        },
        removeMatches: (event) => {
            let selector = event.currentTarget.getAttribute("data-selector");
            editor.doc.querySelectorAll('[data-status="match"]').forEach(m => m.removeAttribute("data-status"));
        },
        updateMatches: (event) => {
            let selector = event.currentTarget.getAttribute("data-selector");
            editor.doc.querySelectorAll(selector).forEach(m => m !== editor.elms.active ? m.setAttribute("data-status", "match") : "");
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
            document.querySelector("#styleList").innerHTML = editor.styles.map(editor.createStyleForm).reverse().join("");
        },
        setDrag : (elm) => {
            elm.draggable = "true";
            elm.addEventListener('dragstart', function dragStart(e) {
                e.stopPropagation();
                editor.drag = this;
            }, false);
            elm.addEventListener('dragend', function dragEnd(e) {
                e.stopPropagation();
            }, false);
            elm.addEventListener('dragover', function dragOver(e) {
                e.preventDefault();
                e.stopPropagation();
            }, false);
            elm.addEventListener('dragenter', function dragEnter(e) {
                e.preventDefault();
                e.stopPropagation();
                let name = "";
                if (this.id) name += "#" + this.id;
                if (this.className) name += "." + this.className;
                document.getElementById("canvasNotice").textContent = name;
                this.parentNode.style.paddingTop = "1em";
                this.classList.toggle("hover");
            }, false);
            elm.addEventListener('dragleave', function dragLeave(e) {
                e.stopPropagation();
                this.parentNode.style.paddingTop = "";
                this.classList.toggle("hover");
            }, false);
            elm.addEventListener('drop', function dragDrop(e) {
                e.stopPropagation();
                this.parentNode.style.paddingTop = "";
                this.classList.toggle("hover");
                document.getElementById("canvasNotice").textContent = "";
                if (elements.elements[this.tagName.toLowerCase()] == null || elements.elements[this.tagName.toLowerCase()].droppable === false) return;
                this.append(editor.drag);
                //editor.updateIds();
            }, false);
        },
        updateIds: () => {
            editor.doc.body.querySelectorAll("*:not(style):not(script)").forEach((elm, index) => {
                editor.setContentEditable(elm);
                elm.setAttribute("tabindex", "0");
                elm.addEventListener("focus", e => editor.setAsActive(e.target));
                if (elements[elm.tagName.toLowerCase()] && elements[elm.tagName.toLowerCase()].draggable !== false) {
                    editor.setDrag(elm);
                }
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
        bindAttributes:  e => {
            if (e.target.type === "checkbox" && e.target.checked) {
                editor.elms.active.setAttribute(e.target.name, e.target.name);
            } else if (e.target.type === "checkbox" && !e.target.checked) {
                editor.elms.active.removeAttribute(e.target.name);
            } else {
                editor.elms.active.setAttribute(e.target.name, e.target.value);
            }
        },
        changeImage: function(event){
            editor.manageImages();
            editor.elms.modal.querySelectorAll("img").forEach(i => i.addEventListener("click", function (e) {
                let el = event.target.parentNode.querySelector('[name="src"]');
                el.value = e.target.src;
                editor.elms.modal.parentNode.removeChild(editor.elms.modal);
                el.dispatchEvent(new Event('change', {bubbles: true}));
            }));
        },
        updateAttrs: (activeElm) => {
            let tag = editor.elms.active.tagName.toLowerCase();
            let html = `<h3>Attributes</h3>`;
            let attributes = !!elements[tag] ? elements[tag].attributes : elements["body"].attributes;
            for (let a in attributes) {
                if (attributes.hasOwnProperty(a)) {
                    let rule = attributes[a];
                    html += `<div class="input-group">
              <label for="${a}">${a}</label>
              ${a === "src" ? "<button onclick=\"editor.changeImage(event)\" class=\"loadImages button-sm\"><i class=\"far fa-images\"/></i></button>" : ""}
              <input
                name="${a}"
                value="${activeElm.getAttribute(a) || ""}"
                ${!isNaN(rule) && typeof rule === "number" ? `
                type="number"
                `: rule === "true|false" ? `
                type="checkbox"
                ${activeElm.getAttribute(a) ? 'checked="checked"' : ""}
                ` : `
                type="text"
                pattern="${rule}"
                `}
              />
            </div>`;
                }
            }
            document.querySelector(".attributes_tab").innerHTML = html;
        },
        manageImages: function (event, target) {
            editor.elms.modal.classList.toggle("invisible");
        },
        unpackEmail: (html) => {
            for (let c in emailComponents) {
                html = html.replace(new RegExp(c, "g"), emailComponents[c]);
            }
            return html
        },
        autoformat: () => {
            CodeMirror.commands["selectAll"](editor.cm);
            let range = { from: editor.cm.getCursor(true), to: editor.cm.getCursor(false) };
            editor.cm.autoFormatRange(range.from, range.to);
        },
        changeView: function (e) {
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
        },
        toggleCode: function (event) {
            editor.elms.cm.style.display = (event.target.value === "code") ? "block" : "none";
            editor.cm.refresh();
            document.body.classList.toggle("editor_open");
        },
        onload: function(){
            editor.doc = editor.elms.canvas.contentDocument;
            editor.elms.canvas_style = document.createElement("style");
            editor.elms.canvas_style.title = "editor";
            editor.doc.head.appendChild(editor.elms.canvas_style);
            Object.keys(config.styles).forEach(style => {
                editor.doc.body.style.setProperty("--" + style, config.styles[style]);
            });
            let fontFace = config.fonts.reduce((acc, style) => acc += `
        @font-face {
          font-family: "${style.name}";
          src: url("${style.path}.eot"); /* IE9 Compat Modes */
          src: url("${style.path}.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */
            url("${style.path}.otf") format("opentype"), /* Open Type Font */
            url("${style.path}.svg") format("svg"), /* Legacy iOS */
            url("${style.path}.ttf") format("truetype"), /* Safari, Android, iOS */
            url("${style.path}.woff") format("woff"), /* Modern Browsers */
            url("${style.path}.woff2") format("woff2"); /* Modern Browsers */
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }`, "");
            editor.elms.canvas_style.innerHTML = fontFace + components.editor_css;

            editor.updateIds();
            editor.doc.addEventListener("keydown", function(event) {
                let save = event.which === 83 && event.ctrlKey;//S
                let moveUp = event.which === 38 && event.shiftKey;
                let moveDown = event.which === 40 && event.shiftKey;
                let link = event.which === 76 && event.ctrlKey;//L
                if (save) {
                    event.preventDefault();
                    editor.save();
                } else if (moveUp) {
                    event.preventDefault();
                    editor.moveUp();
                } else if (moveDown) {
                    event.preventDefault();
                    editor.moveDown();
                } else if (link) {
                    event.preventDefault();
                    let sel = editor.doc.getSelection();
                    if (sel.rangeCount) {
                        let range = sel.getRangeAt(0).cloneRange();
                        let a = document.createElement("a");
                        a.href = "#";
                        range.surroundContents(a);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                }
            });

            const observer = new MutationObserver((mutationsList, observer) => {
                for(let mutation of mutationsList) {
                    console.log(mutation.target);
                    if (mutation.type === 'childList') {
                        if (mutation.addedNodes.length > 0) {
                            console.log('Child node added');
                            console.log(mutation.addedNodes);
                        } else if (mutation.removedNodes.length > 0) {
                            console.log('Child node removed');
                            console.log(mutation.removedNodes);
                        }
                    } else if (mutation.type === 'attributes') {
                        let value = mutation.target.getAttribute(mutation.attributeName);
                        if (value === null) {
                            console.log(`${mutation.attributeName} removed`);
                        } else {
                            console.log(`${mutation.attributeName}="${value}"`);
                        }
                    }
                }
            });
            observer.observe(
                editor.doc.documentElement,
                { attributes: true, childList: true, subtree: true }
            );

            editor.setAsActive(editor.doc.querySelector("[class]"));
        },
        create: function () {
            editor.elms.toolbar = document.createElement("div");
            editor.elms.toolbar.id = "toolbar";
            editor.elms.toolbar.innerHTML = components.toolbar(config);
            editor.elms.toolbar.onchange = function(){
                let settings = {};
                editor.elms.toolbar.querySelectorAll("input:checked").forEach(i => settings[i.name] = i.id);
                localStorage.setItem("toolbar", JSON.stringify(settings));
            }
            editor.node.appendChild(editor.elms.toolbar);
            if (localStorage.getItem("toolbar")) {
                setTimeout(function(){
                    let settings = JSON.parse(localStorage.getItem("toolbar"));
                    Object.keys(settings).forEach(i => {
                        let option = document.getElementById(settings[i]);
                        if (!option.checked) {
                            option.checked = "checked";
                            option.dispatchEvent(new Event('change', {bubbles: true}));
                        }
                    });
                }, 0);
            }

            editor.elms.menu = document.createElement("div");
            editor.elms.menu.classList.add("invisible", "cm_wrap", "modal", "menu");
            editor.elms.menu.innerHTML = components.menu(config);
            editor.node.appendChild(editor.elms.menu);

            editor.elms.modal = document.createElement("div");
            editor.elms.modal.classList.add("invisible", "cm_wrap", "modal", "images");
            editor.elms.modal.innerHTML = components.modal(config.images);
            editor.node.appendChild(editor.elms.modal);
            document.getElementById("modalClose").addEventListener("click", function (event) {
                editor.elms.modal.classList.toggle("invisible");
            });

            editor.elms.canvas = document.createElement("iframe");
            editor.elms.canvas.id = "canvas";
            editor.elms.canvas.srcdoc = config.templates[2].html;
            editor.node.appendChild(editor.elms.canvas);
            editor.elms.canvas.onload = editor.onload;

            editor.elms.cm = document.createElement("div");
            editor.elms.cm.style.display = "none";
            editor.elms.cm.classList.add("cm_wrap");
            editor.node.appendChild(editor.elms.cm);
            editor.cm = CodeMirror(editor.elms.cm, {
                value: editor.elms.canvas.srcdoc,
                lineNumbers: true,
                lineWrapping: true,
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

            editor.elms.editor = document.createElement("div");
            editor.elms.editor.id = "editor";
            editor.elms.editor.innerHTML = `
      <div id="canvasNotice"></div>
      <ul id="hint">${editor.properties.reduce((acc, style) => {
                return `<li onclick="editor.activeInput.value = event.target.textContent;">${style}</li>`;
            }, "")}</ul>
      <div id="tab_panels" class="scroll">
          <div class="editor_panel edit_tab editor_active">
            <div class="attributes_tab"></div>
            <div class="styles_tab">
              <details>
                <summary>Styles</summary>
                <div id="styleList" class="flex">
                ${editor.styles.map(editor.createStyleForm).reverse().join("")}
                </div>
              </details>
            </div>
            <div class="blocks_tab">
              ${config.blocks.map(b => `
              <details>
                <summary>${b.name}</summary>
                ${b.blocks.reduce((acc, block) =>  acc + `
                <div class="block">
                  <h5>${block.id}</h5>
                  <code id="${block.id}" draggable="true" ondragstart="editor.drag = document.createRange().createContextualFragment(this.innerHTML)">${block.html}</code>
                </div>`, "")}
              </details>
              `).join("")}
              <details>
                <summary>Elements</summary>
                ${Object.keys(elements).reduce((acc, b) => acc + `
                <div class="block">
                  <h5>${b}</h5>
                  <code draggable="true" ondragstart="editor.drag = document.createRange().createContextualFragment(this.innerHTML)">${printTags(elements[b], b)}</code>
                </div>`, "")}
              </details>
            </div>
          </div>
        </div>`;
            editor.node.appendChild(editor.elms.editor);
            document.querySelector(".attributes_tab").onchange = editor.bindAttributes;
            document.addEventListener("keyup", function(event) {
                let save = event.which === 83 && event.ctrlKey;
                let changeNum = event.target.tagName === "INPUT" && event.target.name === "value" && (event.which === 38 || event.which === 40);
                if (save) {
                    event.preventDefault();
                    editor.save();
                } else if (changeNum) {
                    let num = event.target.value.replace(/[^0-9]/g, "");
                    let change = 0;
                    if (event.which === 38) change = 1;
                    else if (event.which === 40) change = -1;
                    if (event.shiftKey) change *= 10;
                    else if (event.ctrlKey || event.altKey) change *= 100;
                    event.target.value = event.target.value.replace(num, Number(num) + change);
                } else if (event.target.tagName === "INPUT" && event.target.name === "property") {
                    window.editor.activeInput = event.target;
                    window.editor.activeInput.onblur = function(){
                        setTimeout(() => {
                            hint.querySelectorAll("li").forEach(function(li){
                                li.style.height = "0";
                            });
                        }, 100);
                    };
                    let hint = document.getElementById("hint");
                    hint.style.top = event.target.getBoundingClientRect().bottom + "px";
                    hint.style.left = event.target.getBoundingClientRect().left + "px";
                    hint.style.width = event.target.getBoundingClientRect().width + "px";
                    hint.querySelectorAll("li").forEach(function(li){
                        li.style.height = li.textContent !== event.target.value && li.textContent.indexOf(event.target.value) !== -1  ? "15px" : 0;
                    });
                }
            });

            document.querySelector("#save").addEventListener("click", editor.save);
            document.querySelector("#manageImages").addEventListener("click", editor.manageImages);
            document.getElementById("menuClose").addEventListener("click", function (event) {
                editor.elms.menu.classList.toggle("invisible");
            });
            document.querySelector("#openMenu").addEventListener("click", function (event) {
                editor.elms.menu.classList.toggle("invisible");
            });
            document.querySelector("#speak").addEventListener("click", function (e) {
                // TODO: read alt text, heading numbers, etc.
                speechSynthesis.speak(new SpeechSynthesisUtterance(editor.doc.body.textContent))
            });
            document.querySelector("#fullScreen").addEventListener("click", function (e) {
                editor.node.requestFullscreen();
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
            document.querySelector("#toggleOutlines").addEventListener("click", function (event) {
                editor.doc.body.classList.toggle("no-outline");
            });
            document.querySelector("#sendTestEmail").addEventListener("click", function (event) {
                let subject = prompt("Please enter your subject", "Design tool test. ID:" + Math.round(Math.random() * 999999));
                if (!subject) return;
                fetch('https://api.emailonacid.com/v5/email/tests', {
                    method: 'POST',
                    headers: { 'Authorization': 'Basic ' + keys.EOA },
                    body: JSON.stringify({
                        "subject": subject,
                        "html": editor.doc.documentElement.outerHTML
                    })
                }).then((response) => response.json())
                    .then((data) => {
                        window.open("https://app.emailonacid.com/app/acidtest/"+data.id+"/list", "emailonacid");
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            });
            document.querySelector("#toggleImages").addEventListener("click", function (event) {
                let imgs = editor.doc.querySelectorAll("img");
                imgs.forEach(img => {
                    if (img.src === location.href) {
                        img.src = img.getAttribute("data-src");
                        img.removeAttribute("data-src");
                    } else {
                        img.setAttribute("data-src", img.src);
                        img.src = location.href;
                    }
                });
            });
            document.querySelector("#autoFormat").addEventListener("click", editor.autoformat);
            document.querySelector("#emailInline").addEventListener("click", function (event) {
                let html = editor.doc.documentElement.innerHTML;
                if (html.indexOf("<main") !== -1) editor.doc.documentElement.innerHTML = editor.unpackEmail(html);
                editor.inlineStyles();
                editor.cleanup();
                //remove auto added tbody. outlook no like?
                html = editor.doc.documentElement.innerHTML.replace(/<tbody>|<\/tbody>/g, "");
                editor.cm.setValue(html);
                editor.autoformat();
            });

            return this;
        }
    };
    return editor;
})();