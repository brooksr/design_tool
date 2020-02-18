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
    color: 'rgb.*',//000000
    size: "auto|[0-9]+("+units.join("|")+")",//["auto", "min-content", "max-content", "fit-content", "100%"],
    overflow: ["visible", "hidden", "clip", "scroll", "auto"],
}
  export let styles = [
     {
      "id": "Text",
      "font-family": ".*",//["Arial Regular", "Book Condensed", "Calibri Bold"],
      "font-style": ["normal", "italic", "oblique"],
      "font-weight": "[0-9]{3}|normal|bold|lighter",//["normal", "bold", "lighter"],
      "font-size": defaults.size,
      "line-height": defaults.number,
      "letter-spacing": defaults.size,
      "word-spacing": defaults.number,
      "color": defaults.color,
      "text-transform": ["capitalize", "lowercase", "uppercase"],
      "text-decoration":"",//e => [["underline", "line-through", "overline"], defaults.color, ["solid", "double", "dotted", "dashed", "wavy", "initial", "inherit"]],
      "text-align": ["left", "center", "right", "justify"],
      "text-indent": defaults.number,
      "text-shadow": `${defaults.number} ${defaults.number} ${defaults.color}`,//"1px 1px #000000",
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
      "flex": "",
      "resize": ["none", "both", "horizontal", "vertical"],
    }, {
      "id": "Positioning",
      "position": ["static", "relative", "absolute", "fixed", "inherit"],
      "top": defaults.size,
      "right": defaults.size,
      "bottom": defaults.size,
      "left": defaults.size,
      "margin": defaults.size,//["0px", "0px", "0px", "0px"],
      "padding": defaults.size,//["0px", "0px", "0px", "0px"],
      "clear": ["none", "inline-start", "inline-end", "block-start", "block-end", "left", "right", "top", "bottom"],
      "float": ["none", "block-start", "block-end", "inline-start", "inline-end", "snap-block", "snap-inline", "left", "right", "top", "bottom"],
      "display": ["block", "none", "inline", "inline-block"],
      "alignment-baseline": ["baseline", "text-bottom", "alphabetic", "ideographic", "middle", "central", "mathematical", "text-top", "bottom", "center", "top"],
      "z-index": "[0-9]+",
    }, {
      "id": "Style",
      "background": "",
      "background-color": defaults.color,
      "background-image": "",
      "background-repeat": "",
      "background-attachment": "",
      "background-position": "",
      "background-size": "",
      "filter": "",
      "border": "0px solid",
      "outline": "0px solid",
      "border-radius": defaults.size,
      "opacity": "0|1|[0-1].[0-9]+",
      "transition": "",
      "transform": "",
      "visibility": ["visible", "hidden"],
      "cursor": ["auto", "default", "none", "context-menu", "help", "pointer", "progress", "wait", "cell", "crosshair", "text", "vertical-text", "alias", "copy", "move", "no-drop", "not-allowed", "e-resize", "n-resize", "ne-resize", "nw-resize", "s-resize", "se-resize", "sw-resize", "w-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "col-resize", "row-resize", "all-scroll", "zoom-in", "zoom-out", "grab", "grabbing"],
    }, {
      "id": "Psuedo",
      "content": "",
    }
  ];
