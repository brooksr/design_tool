  /**
   * TODO
   * Media queries
   * Psuedo elements
   * Animation
   * Transition and Transform
   * Grid, Flexbox
   * SVG, masking
   * Lists
   * */ 
  const defaults = {
    color: "#000000",
    size: ["auto", "min-content", "max-content", "fit-content", "100%"],
    overflow: ["visible", "hidden", "clip", "scroll", "auto"],
  }
  export let styles = [
    {
      "id": "Text",
      "font-family": ["Arial Regular", "Book Condensed", "Calibri Bold"],
      "font-style": ["normal", "italic", "oblique"],
      "font-weight": ["normal", "bold", "lighter"],
      "font-size": "16px",
      "line-height": "1.25",
      "letter-spacing": "0px",
      "word-spacing": "0px",
      "color": defaults.color,
      "text-transform": ["capitalize", "lowercase", "uppercase"],
      /*FIX*/"text-decoration":["underline", "line-through", "overline"], //e => [["underline", "line-through", "overline"], defaults.color, ["solid", "double", "dotted", "dashed", "wavy", "initial", "inherit"]],
      "text-align": ["left", "center", "right", "justify"],
      "text-indent": "0em",
      /*FIX*/"text-shadow": "1px 1px #000000",
      "word-wrap": ["normal", "break-word", "anywhere"],
      "white-space": ["normal", "pre", "nowrap", "pre-wrap", "pre-line"],
      "text-wrap": ["wrap", "nowrap", "balance", "stable", "pretty"],
      "text-overflow": ["clip", "ellipsis"],
    }, {
      "id": "Sizing",
      "height": defaults.size,
      "width": defaults.size,
      "min-width": defaults.size,
      "max-width": defaults.size,
      "min-height": defaults.size,
      "max-height": defaults.size,
      "overflow-x": defaults.overflow,
      "overflow-y": defaults.overflow,
      "resize": ["none", "both", "horizontal", "vertical"],
    }, {
      "id": "Positioning",
      "position": ["static", "relative", "absolute", "fixed", "inherit"],
      "top": ["auto", "0px"],
      "right": ["auto", "0px"],
      "bottom": ["auto", "0px"],
      "left": ["auto", "0px"],
      "margin": ["0px", "0px", "0px", "0px"],
      "padding": ["0px", "0px", "0px", "0px"],
      "clear": ["none", "inline-start", "inline-end", "block-start", "block-end", "left", "right", "top", "bottom"],
      "float": ["none", "block-start", "block-end", "inline-start", "inline-end", "snap-block", "snap-inline", "left", "right", "top", "bottom"],
      "display": ["block", "none", "inline", "inline-block"],
      "alignment-baseline": ["baseline", "text-bottom", "alphabetic", "ideographic", "middle", "central", "mathematical", "text-top", "bottom", "center", "top"],
      "z-index": 1,
    }, {
      "id": "Style",
      "background-color": defaults.color,
      //"background-image": "",
      //"background-repeat": "",
      //"background-attachment": "",
      //"background-position": "",
      //"filter": "",
      "border": "0px solid",
      "outline": "0px solid",
      "border-radius": "0px",
      "opacity": "1.00",
      "visibility": ["visible", "hidden"],
      "cursor": ["auto", "default", "none", "context-menu", "help", "pointer", "progress", "wait", "cell", "crosshair", "text", "vertical-text", "alias", "copy", "move", "no-drop", "not-allowed", "e-resize", "n-resize", "ne-resize", "nw-resize", "s-resize", "se-resize", "sw-resize", "w-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "col-resize", "row-resize", "all-scroll", "zoom-in", "zoom-out", "grab", "grabbing"],
    }
  ];