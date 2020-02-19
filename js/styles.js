  /**
   * TODO
   * Animation
   * Grid, Flexbox
   * SVG, masking
   * Lists
   * */
  const units =  ["px", "%", "em", "vmax", "vmin", "vh", "vw"];
  const defaults = {
    number: `[0-9]+(${units.join("|")})?`,
    color: 'rgb.*',
    border: '(none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset)',
    size: "auto|[0-9]+("+units.join("|")+")",//"min-content", "max-content", "fit-content"
    overflow: ["visible", "hidden", "clip", "scroll", "auto"],
}
  export let styles = [
     {
      "id": "Text",
      "font-family": ".*",
      "font-style": ["normal", "italic", "oblique"],
      "font-weight": "[0-9]{3}|normal|bold|lighter",
      "font-size": defaults.size,
      "line-height": defaults.number,
      "letter-spacing": defaults.size,
      "word-spacing": defaults.number,
      "color": defaults.color,
      "text-transform": ["capitalize", "lowercase", "uppercase"],
      "text-decoration":"",//<'text-decoration-line'> || <'text-decoration-style'> || <'text-decoration-color'> || <'text-decoration-thickness'>
      "text-align": ["left", "center", "right", "justify"],
      "text-indent": defaults.number,
      "text-shadow": `${defaults.number} ${defaults.number}( ${defaults.number})? ${defaults.color}`,
      "word-wrap": ["normal", "break-word", "anywhere"],
      "white-space": ["normal", "pre", "nowrap", "pre-wrap", "pre-line"],
      "text-overflow": ["clip", "ellipsis"],
    }, {
      "id": "Sizing",
      "height": defaults.size,
      "width": defaults.size,
      "min-width": defaults.size,
      "max-width": defaults.size,
      "min-height": defaults.size,
      "max-height": defaults.size,
      "overflow": defaults.overflow,
      "overflow-x": defaults.overflow,
      "overflow-y": defaults.overflow,
      "flex": `none|${defaults.number}.*(${defaults.number})?.*(${defaults.size})`,
      "flex-grow": defaults.number,
      "flex-shrink": defaults.number,
      "flex-basis": defaults.size,
      "resize": ["none", "both", "horizontal", "vertical"],
    }, {
      "id": "Positioning",
      "position": ["static", "relative", "absolute", "fixed", "inherit"],
      "top": defaults.size,
      "right": defaults.size,
      "bottom": defaults.size,
      "left": defaults.size,
      "margin": `${defaults.size}.*(${defaults.size})?.*(${defaults.size})?.*(${defaults.size})?.*`,
      "margin-top": defaults.size,
      "margin-left": defaults.size,
      "margin-bottom": defaults.size,
      "margin-right": defaults.size,
      "padding": `${defaults.size}.*(${defaults.size})?.*(${defaults.size})?.*(${defaults.size})?.*`,
      "padding-top": defaults.size,
      "padding-left": defaults.size,
      "padding-bottom": defaults.size,
      "padding-right": defaults.size,
      "clear": ["none", "inline-start", "inline-end", "block-start", "block-end", "left", "right", "top", "bottom"],
      "float": ["none", "block-start", "block-end", "inline-start", "inline-end", "snap-block", "snap-inline", "left", "right", "top", "bottom"],
      "display": ["block", "none", "inline", "inline-block", "flex", "grid", "table", "table-row" ,"table-cell", "list-item"],
      "flex-direction": ["row",  "row-reverse",  "column",  "column-reverse"],
      "flex-wrap": ["nowrap",  "wrap",  "wrap-reverse"],
      "flex-flow": "",//<‘flex-direction’> || <‘flex-wrap’>
      "justify-content": ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly", "start", "end", "left", "right"],
      "alignment-baseline": ["baseline", "text-bottom", "alphabetic", "ideographic", "middle", "central", "mathematical", "text-top", "bottom", "center", "top"],
      "align-items": ["align-items: stretch", "flex-start", "flex-end", "center", "baseline", "first baseline", "last baseline", "start", "end", "self-start", "self-end"],
      "align-content": ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly", "stretch", "start", "end", "baseline"],
      "order": "[0-9]+",
      "flex": `[0-9]+.*([0-9]+)?.*${defaults.size}`,
      "flex-grow": "[0-9]+",
      "flex-shrink": "[0-9]+",
      "flex-basis": defaults.size,
      "z-index": "[0-9]+",
    }, {
      "id": "Style",
      "background": "",//https://developer.mozilla.org/en-US/docs/Web/CSS/background
      "background-color": defaults.color,
      "background-image": "",//https://developer.mozilla.org/en-US/docs/Web/CSS/background-image
      "background-repeat": "",//repeat-x", "repeat-y", "[ repeat", "space", "round", "no-repeat ]{1,2}
      "background-attachment": ["scroll","fixed","local"],
      "background-position": "",//https://developer.mozilla.org/en-US/docs/Web/CSS/background-position
      "background-size": "",//[ <length-percentage>", "auto ]{1,2}", "cover", "contain
      "filter": "", //https://developer.mozilla.org/en-US/docs/Web/CSS/filter
      "border": `none|${defaults.number} ${defaults.border} ${defaults.color}`,
      "border-width": defaults.number,
      "border-style": defaults.border,
      "border-color": defaults.color,
      "border-radius": defaults.number,
      "outline": `none|${defaults.number} ${defaults.border} ${defaults.color}`,
      "border-width": defaults.number,
      "border-style": defaults.border,
      "border-color": defaults.color,
      "border-radius": defaults.size,
      "opacity": "0|1|[0-1].[0-9]+",
      "transition": "",//https://developer.mozilla.org/en-US/docs/Web/CSS/transition
      "transform": "", //https://developer.mozilla.org/en-US/docs/Web/CSS/transform
      "visibility": ["visible", "hidden"],
      "cursor": ["auto", "default", "none", "context-menu", "help", "pointer", "progress", "wait", "cell", "crosshair", "text", "vertical-text", "alias", "copy", "move", "no-drop", "not-allowed", "e-resize", "n-resize", "ne-resize", "nw-resize", "s-resize", "se-resize", "sw-resize", "w-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "col-resize", "row-resize", "all-scroll", "zoom-in", "zoom-out", "grab", "grabbing"],
    }, {
      "id": "Other",
      "content": "",
      "text-size-adjust": "none|auto|[0-9]+%",
      "list-style-type": "",
      "border-spacing": "",
      "border-collapse": "",
      "table-layout": "",
      "direction": "",
      "box-sizing": ""
    }
  ];
