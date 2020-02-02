(function(){
  "use strict";
  const canvas = document.getElementById("canvas");
  const defaults = {
    color: {value: "#000000", unit: "hex"},
    size: ["auto", "min-content", "max-content", "fit-content", {value: 100, unit: "%"}],
    overflow: ["visible", "hidden", "clip", "scroll", "auto"],
  }
  /**
   * TODO
   * Media queries
   * Grid, Flexbox
   * Psuedo elements
   * SVG, masking
   * Animation
   * Transition and Transform
   * Lists
   * */ 
  let inline = (a) => {
    return a;
  }
  let panels = [
    {
      "id": "text",
      "font-family": ["Arial Regular", "Book Condensed", "Calibri Bold"],
      "font-style": ["normal", "italic", "oblique"],
      "font-weight": ["normal", "bold", "lighter"],
      "font-size": {value: 16, unit: "px"},
      "line-height": {value: 1.2, unit: ""},
      "letter-spacing": {value: 0, unit: "px"},
      "word-spacing": {value: 0, unit: "px"},
      "color": defaults.color,
      "text-transform": ["capitalize", "lowercase", "uppercase"],
      "text-decoration": e => [{value: 1, unit: "px"}, ["underline", "line-through", "overline"], defaults.color],
      "text-align": ["left", "center", "right", "justify"],
      "text-indent": {value: 1, unit: "em"},
      "text-shadow": {x: {value: 1, unit: "px"}, y: {value: 1, unit: "px"}, color: defaults.color},
    }, {
      "id": "sizing",
      "height": defaults.size,
      "width": defaults.size,
      "min-width": defaults.size,
      "max-width": defaults.size,
      "min-height": defaults.size,
      "max-height": defaults.size,
      "overflow-x": defaults.overflow,
      "overflow-y": defaults.overflow,
    }, {
      "id": "positioning",
      "margin": [{value: 0, unit: "px"}, {value: 0, unit: "px"}, {value: 0, unit: "px"}, {value: 0, unit: "px"}],
      "padding": [{value: 0, unit: "px"}, {value: 0, unit: "px"}, {value: 0, unit: "px"}, {value: 0, unit: "px"}],
      "position": ["static", "relative", "absolute", "fixed", "inherit"],
      "top": ["auto", {value: 0, unit: "px"}],
      "right": ["auto", {value: 0, unit: "px"}],
      "bottom": ["auto", {value: 0, unit: "px"}],
      "left": ["auto", {value: 0, unit: "px"}],
      "clear": ["inline-start", "inline-end", "block-start", "block-end", "left", "right", "top", "bottom", "none"],
      "float": ["block-start", "block-end", "inline-start", "inline-end", "snap-block", "snap-inline", "left", "right", "top", "bottom", "none"],
      "display": ["block", "none", "inline", "inline-block"],
      "text-overflow": ["clip", "ellipsis"],
      "cursor": "",
      "word-wrap": ["normal", "break-word", "anywhere"],
      "white-space": ["normal", "pre", "nowrap", "pre-wrap", "pre-line"],
      "text-wrap": ["wrap", "nowrap", "balance", "stable", "pretty"],
      "resize": ["none", "both", "horizontal", "vertical"],
      "alignment-baseline": ["baseline", "text-bottom", "alphabetic", "ideographic", "middle", "central", "mathematical", "text-top", "bottom", "center", "top"],
      "z-index": 1,
    }, {
      "id": "style",
      "background-color": defaults.color,
      //"background-image": "",
      //"background-repeat": "",
      //"background-attachment": "",
      //"background-position": "",
      //"border": "",
      //"outline": "",
      //"border-radius": "",
      //"filter": "",
      "opacity": {value: 1, step: "0.01"},
      "visibility": ["visible", "hidden"],
    }
  ];

  const units = `<select><option>px</option><option>%</option><option>em</option><option>none</option></select>`;
  let create_input = (p, i) => {
    let html = "";
    if (Array.isArray(p[i])) {
      html += `<select>`;
      html += p[i].map((o, ind) => `<option>${p[i][ind]}</option>`).join("");
      html += `</select>`;
    } else if (typeof p[i] === "function") {
      //html += create_input(p[i];
    } else if (p[i].value !== undefined && p[i].unit !== undefined) {
      if (p[i].unit == "hex") html += `<input value="${p[i].value}" type="color"/>`;
      else html += `<input value="${p[i].value}" type="number"/>${units}`;
    } else if (p[i].value !== undefined && p[i].step !== undefined) {
      html += `<input value="${p[i].value}" type="number" step="${p[i].step}"/>`;
    } else {
      html += `<input value="${p[i]}" type="text"/>`;
    }
    return html;
  }
  panels.forEach(p => {
    let panel = document.createElement("div");
    panel.className = "panel";
    let html = `<h2>${p.id}</h2>`;
    for (let i in p) {
      if (i != "id") {
        html += `<div class="input-group">`;
        html += `<label>${i}</label>`;
        html += create_input(p, i);
        html += `</div>`;
      }
    }
    panel.innerHTML = html;
    canvas.appendChild(panel);
  });

})();