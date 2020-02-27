
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
    <button id="modalClose">&times;</button>
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
  menu: (config) => `
    <button id="menu_close">&times;</button>
    <div class="newItem">
      <h3>New</h3>
      <ul>
      ${config.templates.map((i, index) => `<li onclick="editor.update(editor.config.templates[${index}])">
        ${i.icon}
        <h4>${i.name}</h4>
        </li>`).join("")}
      </ul>
    </div>
    <div class="openItem">
    <h3>Open</h3>
    ${config.campaigns.map((campaign, ind) => `
    <div class="campaignWrapper">
      <h3><a href="${campaign.opp}" target="_blank">${campaign.name}</a></h3>
      <p>${campaign.desc}</p>
      <div>
      ${campaign.modal ? campaign.modal.map((i, index) => `
        <button onclick="editor.update(editor.config.campaigns[${ind}].modal[${index}])">${i.name}</button>`).join("") : ""}
      ${campaign.email ? campaign.email.map((i, index) => `
        <button onclick="editor.update(editor.config.campaigns[${ind}].email[${index}])">${i.name}</button>`).join(""): ""}
      </div>
    </div>
     `).join("")}
    </div>

    <!--<ul>
    ${Object.keys(localStorage).map((i, index) => `
      <li onclick="editor.update(${index})">
        ${JSON.parse(localStorage[i]).icon}
        <h4>${JSON.parse(localStorage[i]).name}</h4>
      </li>`).join("")}
    </ul>-->
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
  .hover {
    opacity: 0.2;
  }
  * {
    box-sizing: inherit;
    outline: 1px dashed rgba(100, 100, 100, 0.5);
  }
  *:hover {
    outline: 1px dashed rgba(47,165,228, 0.5);
  }
  [data-status="active"] {
    outline: 1px dashed #4db357;
  }
  [draggable] {
    user-select: none;
  }
  [data-status="match"]:before {
    content: "Match";
    float: left;
    position: absolute;
    width: 4em;
    left: -4em;
    background: #4db357;
    color: #fff;
    border-radius: 5px;
    font-size: 0.5rem;
    padding: 0.25em;
    overflow: visible;
    white-space: nowrap;
    word-break: normal;
  }
  .no-outline * {
    outline: none !important;
  }`,
  toolbar: config => `
  <div class="button-group">
    <button type="button" id="openMenu"><i class="fas fa-bars"></i> <span class="tablet-tooltip">Menu</span></button>
  </div>
  <div class="">
    <input id="assetName" type="text" placeholder="Enter asset name" value="${config.templates[3].name}">
    <button type="button" id="save"><i class="far fa-save"></i> <span class="tablet-tooltip">Save</span></button>
  </div>
  <div class="radio-buttons" id="editor-view">
    <input id="editor-view-visual" name="editor-view" type="radio" value="visual" checked="checked"/>
    <label for="editor-view-visual" ><i class="fas fa-eye"></i> <span class="tablet-tooltip">Visual</span></label>
    <input id="editor-view-code" name="editor-view" type="radio" value="code" />
    <label for="editor-view-code" ><i class="fas fa-code"></i> <span class="tablet-tooltip">Code</span></label>
  </div>
  <div class="radio-buttons code_control">
    <button type="button" id="emailInline">Email Inline</button>
    <button type="button" id="autoFormat">Autoformat</button>
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
    <button type="button" onclick="editor.moveUp()"><i class="fas fa-arrow-up"></i> <span class="tablet-tooltip">Order Up</span></button>
    <button type="button" onclick="editor.moveDown()"><i class="fas fa-arrow-down"></i> <span class="tablet-tooltip">Order Down</span></button>
  </div>-->
  <div class="button-group visual_control">
    <button type="button" id="zoomIn"><i class="fas fa-search-plus"></i> <span class="tablet-tooltip">Zoom In</span></button>
    <button type="button" id="zoomO">100%</button>
    <button type="button" id="zoomOut"><i class="fas fa-search-minus"></i> <span class="tablet-tooltip">Zoom Out</span></button>
  </div>
  <div class="button-group visual_control">
    <button type="button" id="toggleOutlines"><i class="fas fa-border-none"></i> <span class="tablet-tooltip">Toggle Outlines</span></button>
    <button type="button" id="toggleImages"><i class="far fa-image"></i> <span class="tablet-tooltip">Toggle Images</span></button>
    <button type="button" id="manageImages"><i class="far fa-images"></i> <span class="tablet-tooltip">Manage Images</span></button>
    <button type="button" id="sendTestEmail"><i class="far fa-paper-plane"></i> <span class="tablet-tooltip">EOA Test</span></button>
    <button type="button" id="fullScreen"><i class="fas fa-expand-arrows-alt"></i> <span class="tablet-tooltip">Full Screen</span></button>
    <button type="button" id="speak"><i class="fas fa-voicemail"></i> <span class="tablet-tooltip">Speak</span></button>
  </div>
`
};
