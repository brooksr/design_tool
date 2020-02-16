
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
         <i class="fas fa-fill"></i>
         <i class="fas fa-eye-dropper"></i>
         <i class="fas fa-eye-clone"></i>
         <i class="fas fa-list-ol"></i>
         <i class="fas fa-list-ul"></i>
         <i class="fas fa-th"></i>
         <i class="fas fa-th-large"></i>
         <i class="fas fa-th-list"></i>
         <i class="fas fa-trash"></i>*/
export let components = {
  modal: (images) => `
    <button id="modal_close">&times;</button>
    <h3>Manage Images</h3>
    <form action="" method="post" enctype="multipart/form-data">
      <input type="file" name="fileToUpload" id="fileToUpload">
      <input type="submit" value="Upload Image" name="submit">
    </form>
    <ul>
    ${images.map(i => `<li>
      <img src="${i}" />
      <a href="${i}" target="_blank">${i}</a><span class="image-size">99kb</span>
      </li>`).join("")}
    </ul>
  `,
  menu: (templates) => `
    <button id="menu_close">&times;</button>
    <button type="button" id="manageImages"><i class="far fa-images"></i> <span class="">Manage Images</span></button>
    <button type="button" id="save"><i class="far fa-save"></i> <span class="">Save</span></button>
    <hr />
    <h3>New</h3>
    <ul>
    ${templates.map((i, index) => `<li onclick="editor.update(${index})">
      ${i.icon}
      <h4>${i.name}</h4>
      </li>`).join("")}
    </ul>
    <h3>Open</h3>
    <ul>
    ${templates.map((i, index) => `<li onclick="editor.update(${index})">
      ${i.icon}
      <h4>${i.name}</h4>
      </li>`).join("")}
    </ul>
  `,
  editor_css: `
  body, html {
    min-height:100vh;
  }
  body {
    margin:0;
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
  }`,
  toolbar: `
  <div class="button-group">
    <button type="button" id="openMenu"><i class="fas fa-bars"></i> <span class="tablet-tooltip">Menu</span></button>
  </div>
  <div class="radio-buttons code_control">
    <button type="button" id="emailInline">Email Inline</button>
  </div>
  <div class="radio-buttons" id="editor-view">
    <input id="editor-view-visual" name="editor-view" type="radio" value="visual" checked="checked"/>
    <label for="editor-view-visual" ><i class="fas fa-eye"></i> <span class="tablet-tooltip">Visual</span></label>
    <input id="editor-view-code" name="editor-view" type="radio" value="code" />
    <label for="editor-view-code" ><i class="fas fa-code"></i> <span class="tablet-tooltip">Code</span></label>
  </div>
  <div class="radio-buttons visual_control" id="device-view">
    <input id="device-view-desktop" name="device-view" type="radio" value="desktop" checked="checked"/>
    <label for="device-view-desktop" ><i class="fas fa-desktop"></i> <span class="tablet-tooltip">Desktop</span></label>
    <input id="device-view-tablet" name="device-view" type="radio" value="tablet" />
    <label for="device-view-tablet" ><i class="fas fa-tablet-alt"></i> <span class="tablet-tooltip">Tablet</span></label>
    <input id="device-view-mobile" name="device-view" type="radio" value="mobile" />
    <label for="device-view-mobile" ><i class="fas fa-mobile-alt"></i> <span class="tablet-tooltip">Mobile</span></label>
  </div>
  <!--<div class="button-group">
    <button type="button">Undo</button>
    <button type="button">Redo</button>
  </div>-->
  <div class="button-group visual_control">
    <button type="button" id="zoomIn"><i class="fas fa-search-plus"></i> <span class="tablet-tooltip">Zoom In</span></button>
    <button type="button" id="zoomO">100%</button>
    <button type="button" id="zoomOut"><i class="fas fa-search-minus"></i> <span class="tablet-tooltip">Zoom Out</span></button>
  </div>
  <div class="button-group visual_control">
    <button type="button" onclick="editor.canvas.moveUp()"><i class="fas fa-arrow-up"></i> <span class="tablet-tooltip">Order Up</span></button>
    <button type="button" onclick="editor.canvas.moveDown()"><i class="fas fa-arrow-down"></i> <span class="tablet-tooltip">Order Down</span></button>
    <button type="button" onclick="editor.canvas.changeActive('up')"><i class="far fa-arrow-alt-circle-up"></i> <span class="tablet-tooltip">Focus Up</span></button>
    <button type="button" onclick="editor.canvas.changeActive('down')"><i class="far fa-arrow-alt-circle-down"></i> <span class="tablet-tooltip">Focus Down</span></button>
  </div>
  <div class="button-group visual_control">
    <button type="button" id="toggleOutlines"><i class="fas fa-border-none"></i> <span class="tablet-tooltip">Toggle Outlines</span></button>
    <button type="button" id="fullScreen"><i class="fas fa-expand-arrows-alt"></i> <span class="tablet-tooltip">Full Screen</span></button>
    <button type="button" id="speak"><i class="fas fa-voicemail"></i> <span class="tablet-tooltip">Speak</span></button>
  </div>
  <div class="radio-buttons visual_control" id="sidebar-tabs">
    <input id="device-view-Edit" name="sidebar-tabs" type="radio" value="edit" checked="checked" />
    <label for="device-view-Edit" >Edit</label>
    <input id="device-view-Blocks" name="sidebar-tabs" type="radio" value="blocks" />
    <label for="device-view-Blocks" >Blocks</label>
  </div>
`
}
