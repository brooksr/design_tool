'use strict';
//import {config} from './config.js';
//import {editor} from './editor.js';
import {elements} from './elements.js';
import {modalBlocks} from './modal-blocks.js';
import {emailBlocks} from './email-blocks.js';

import {email} from './templates/email.js';
import {email2} from './templates/email2.js';
import {modal} from './templates/modal.js';
import {bar} from './templates/bar.js';
import {uml} from './templates/uml.js';
import {uml_export} from './templates/uml_export.js';
import {keys} from "../keys";

let config = {
    campaigns: [
        {
        name: "Inboxed Incentive | Save Your Cart",
        desc: "Summary of campaign. Testing instructions.",
        rules: {
            lift_test: 0.90,
            languages: ["en"],
            locales: ["us"],
            pages: ["home"],
            stages: ["active_cart"],
            visitors: ["new"],
            notes: "",
        },
        features: {
            other: ["cart_rebuilder", "coupon_reminder"],
            coupon: {
            source: "SAVE10",
            expiration: "2020-12-31",
            apply: "Only from email"
            },
            notes: "",
        },
        admin: {
            site_id: "23456",
            tracking: "https://www.example.com?url=",
            sale_window: 86400 * 30,
            opp: "https://upsellit.lightning.force.com/lightning/r/Opportunity/0060g000010TmmNAAS/view",
            design_notes: "This is an area for design notes and feedback. Add links to client references and assets.",
            dev_notes: "Notes for the development team. Comments on specific functionality.",
            qa_notes: "Notes for QA. Links to QA docs.",
        },
        modal: [{
            name: "Lead Capture",
            html: modal,
            split: "",
            launch_method: "abandonment",
            launch_settings: 6,
            link: "https://www.destination.com/cart",
            notes: "",
        },{
            name: "Coupon reminder",
            html: bar,
            notes: "",
        }],
        email: [{
            name: "Email 1",
            time: 3600,
            html: uml_export,
            link: "https://www.destination.com/cart",
            notes: "",
        },{
            name: "Email 2",
            time: 86400 - 3600,
            html: email,
            link: "https://www.destination.com/cart",
            notes: "",
        },{
            name: "Email 3",
            time: 86400 * 2,
            html: email2,
            link: "https://www.destination.com/cart",
            notes: "",
        }]
        },
        {
        name: "Precise Promotion | Free Shipping",
        desc: "Example description here.",
        opp: "https://upsellit.lightning.force.com/lightning/r/Opportunity/0060g000010TmmNAAS/view",
        modal: [{
            name: "FS",
            html: modal,
            split: "",
            launch_method: "abandonment",
            launch_settings: 6,
            link: "https://www.destination.com/cart",
            notes: "",
        }]
        }
    ],
    templates: [{
        html: modal,
        name: "Modal 1",
        icon: '<i class="fas fa-ad"></i>'
    },{
        html: email,
        name: "Email 1",
        icon: '<i class="far fa-envelope"></i>'
    },{
        html: email2,
        name: "Email 2",
        icon: '<i class="far fa-envelope"></i>'
    },{
        html: bar,
        name: "bar 1",
        icon: '<i class="fas fa-ad"></i>'
    },{
        html: uml,
        name: "uml 1",
        icon: '<i class="fab fa-html5"></i>'
    },{
        html: uml_export,
        name: "uml_export",
        icon: '<i class="fab fa-html5"></i>'
    }],
    blocks: [{
        name: "Modal blocks",
        blocks: modalBlocks
    },{
        name: "Email blocks",
        blocks: emailBlocks
    }],
    images: [
        "https://via.placeholder.com/600x50?text=LOGO",
        "https://via.placeholder.com/50x50?text=1",
        "https://via.placeholder.com/250x250?text2",
        "https://via.placeholder.com/50x300?text=3",
        "https://via.placeholder.com/50x50?text=4",
    ],
    fonts: [{
        name: "SamsungSansRegular",
        path: "./fonts/SamsungSansRegular-webfont"
    },{
        name: "SamsungSansSharp",
        path: "./fonts/SamsungSharpSans-Medium"
    }],
    styles: {
        "display-font": "SamsungSansSharp",
        "text-font": "SamsungSansRegular",
        "main-bg-color": "hsl(0, 0, 0)",
        "main-font-color": "hsl(0, 0%, 98%)",
        "primary-color": "hsl(231, 78%, 35%)",
        "primary-color-dark": "hsl(231, 78%, 30%)",
        "primary-color-text": "hsl(0, 0%, 98%)",
        "overlay-color": "hsla(0, 0%, 0%, 0.5)"
    },
};
let canvasStyle = `
    ${config.fonts.reduce((acc, style) => acc += `
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
    }`, "")}
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
        ${Object.keys(config.styles).map(style => `--${style}: ${config.styles[style]};`).join("\n")}
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
    }   
`;
let setDrag = (elm) => {
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
        if (elements[this.tagName.toLowerCase()] == null || elements[this.tagName.toLowerCase()].droppable === false) return;
        this.append(editor.drag);
        //editor.updateIds();
    }, false);
};
let editor = {};
function Menu(props) {
    return (
        <div className={"cm_wrap modal menu" + (props.open ? "" : " invisible")}>
            <button id="menuClose" className="button-small" onClick={props.toggleMenu}>×</button>
            <div className="newItem">
                <h3>New</h3>
                <ul>
                    {config.templates.map((i, index) => 
                    <li key={i.name}>
                        {i.icon}
                        <h4>{i.name}</h4>
                    </li>
                    )}
                </ul>
            </div>
            <div className="openItem">
                <h3>Open</h3>
                {config.campaigns.map((campaign, ind) => 
                <div key={campaign.desc} className="campaignWrapper">
                    <h4><a href={campaign.opp} target="_blank">{campaign.name}</a></h4>
                    <p>{campaign.desc}</p>
                    <div>
                        {campaign.modal && campaign.modal.map((i, index) => (<button key={index}>{i.name}</button>))}
                        <br /><br />
                        {campaign.email && campaign.email.map((i, index) => (<button key={index}>{i.name}</button>))}
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}
function Toolbar(props) {
    let requestFullscreen = function(){
        document.body.requestFullscreen();
    };
    let readScreen = function () {
        // TODO: read alt text, heading numbers, etc.
        let canvas = document.getElementById("canvas").contentDocument;
        speechSynthesis.speak(new SpeechSynthesisUtterance(canvas.body.textContent))
    };
    let testEmail = function () {
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
    }
    return (
        <div id="toolbar">
            <div className="button-group">
                <button type="button" id="openMenu" onClick={props.toggleMenu}>
                    <i className="fas fa-bars"></i>
                    <span className="tablet-tooltip">Menu</span>
                </button>
                <button type="button" id="manageImages">
                    <i className="far fa-images"></i>
                    <span className="tablet-tooltip">Manage Images</span>
                </button>
            </div>
            <div className="save-group">
                <input id="assetName" type="text" placeholder="Enter asset name" defaultValue="" autoComplete="off"/>
                <button type="button" id="save">
                    <i className="far fa-save"></i>
                    <span className="tablet-tooltip">Save</span>
                </button>
            </div>
            <div className="radio-buttons" id="editor-view" onChange={props.toggleView}>
                <input id="editor-view-visual" name="editor-view" type="radio" value="visual" defaultChecked/>
                <label htmlFor="editor-view-visual">
                    <i className="fas fa-eye"></i>
                    <span className="tablet-tooltip">Visual</span>
                </label>
                <input id="editor-view-code" name="editor-view" type="radio" value="code"/>
                <label htmlFor="editor-view-code">
                    <i className="fas fa-code"></i>
                    <span className="tablet-tooltip">Code</span>
                </label>
            </div>
            <div className="radio-buttons code_control">
                <button type="button" id="emailInline">Email Inline</button>
                <button type="button" id="autoFormat">Autoformat</button>
            </div>
            <div className="radio-buttons visual_control" id="device-view" onChange={props.changeDevice}>
                <input id="device-view-desktop" name="device-view" type="radio" value="desktop" defaultChecked/>
                <label htmlFor="device-view-desktop">
                    <i className="fas fa-desktop"></i>
                    <span className="tablet-tooltip">Desktop</span>
                </label>
                <input id="device-view-tablet" name="device-view" type="radio" value="tablet"/>
                <label htmlFor="device-view-tablet">
                    <i className="fas fa-tablet-alt"></i>
                    <span className="tablet-tooltip">Tablet</span>
                </label>
                <input id="device-view-mobile" name="device-view" type="radio" value="mobile"/>
                <label htmlFor="device-view-mobile">
                    <i className="fas fa-mobile-alt"></i>
                    <span className="tablet-tooltip">Mobile</span>
                </label>
            </div>
            <div className="button-group visual_control">
                <button type="button" id="zoomIn" onClick={e => props.changeZoom(e, "in")}>
                    <i className="fas fa-search-plus"></i>
                    <span className="tablet-tooltip">Zoom In</span>
                </button>
                <button type="button" id="zoomO" onClick={e => props.changeZoom(e, "")}>100%</button>
                <button type="button" id="zoomOut" onClick={e => props.changeZoom(e, "out")}>
                    <i className="fas fa-search-minus"></i>
                    <span className="tablet-tooltip">Zoom Out</span>
                </button>
            </div>
            <div className="button-group visual_control">
                <button type="button" id="toggleOutlines" onClick={props.toggleOutlines}>
                    <i className="fas fa-border-none"></i>
                    <span className="tablet-tooltip">Toggle Outlines</span>
                </button>
                <button type="button" id="toggleImages" onClick={props.toggleImages}>
                    <i className="far fa-image"></i>
                    <span className="tablet-tooltip">Toggle Images</span>
                </button>
                <button type="button" id="sendTestEmail" onClick={testEmail}>
                    <i className="far fa-paper-plane"></i>
                    <span className="tablet-tooltip">EOA Test</span>
                </button>
                <button type="button" id="fullScreen" onClick={requestFullscreen}>
                    <i className="fas fa-expand-arrows-alt"></i>
                    <span className="tablet-tooltip">Full Screen</span>
                </button>
                <button type="button" id="speak" onClick={readScreen}>
                    <i className="fas fa-voicemail"></i>
                    <span className="tablet-tooltip">Speak</span>
                </button>
            </div>
        </div>
    );
}
function Canvas(props) {
    let handleLoad = () => {
        let canvas = document.getElementById("canvas").contentDocument;
        let canvas_style = document.createElement("style");
        canvas_style.title = "editor";
        canvas_style.innerHTML = canvasStyle;
        canvas.head.appendChild(canvas_style);
        canvas.body.addEventListener("focusin", e => {
            if (canvas.querySelector("[data-status]")) canvas.querySelector("[data-status]").removeAttribute("data-status");
            e.target.setAttribute("data-status", "active");
        });
        canvas.body.querySelectorAll("*:not(style):not(script)").forEach((elm, index) => {
            const hasTextNode = Array.from(elm.childNodes).filter(node => {
                return node.nodeName === "#text"
                    && node.textContent.replace(/\s/g, "") !== ""
                    && !node.parentNode.isContentEditable;
            }).length > 0;
            if (hasTextNode) elm.contentEditable = true;
            elm.setAttribute("tabindex", "0");
            if (elements[elm.tagName.toLowerCase()] && elements[elm.tagName.toLowerCase()].draggable !== false) {
                setDrag(elm);
            }
        });
    };
    let classes = "canvasWrapper scroll canvas_" + props.device;
    if (props.outlines) classes += " show-outlines"; //how to target inside iframe?

    return (
        <div className={classes}>
            <iframe id="canvas" srcDoc={props.html} onLoad={handleLoad} style={{transform: `scale(${props.zoom})`}}>
                <h1>Testing</h1>
            </iframe>
        </div>
    );
}
function Block (props) {
    let handleDragStart = e => editor.drag = document.createRange().createContextualFragment(e.target.textContent);//innerHTML
    return (
        <div className="block">
            <h5>{props.id}</h5>
            <code id={props.id} draggable="true" onDragStart={handleDragStart}>{props.html}</code>
        </div>
    )
}
function Attribute(props) {
    return (
        <div className="input-group">
            <label htmlFor={props.name}>{props.name}</label>
            <input name={props.name} value={props.value} type="text" pattern={props.pattern} />
        </div>
    )
}
function ValueInput(props) {
    return (
        <input name="value" type="text" autoComplete="off"
            value={props.value} //"${value.replace(/"/g, "'")}"
            pattern={props.pattern} //"${styles[prop]}"
            className={props.className} //"${/^[rgb|hsl|#]/.test(value) ? `rgb` : "nonrgb"}"
            //${/^[rgb|hsl|#]/.test(value) ? `style="background-color:${value};"` : ""}
        />
    )
}
function ValueSelect(props) {
    return (
        <select value={props.property} name="value" autoComplete="off" defaultValue="pointer">
            <option value="auto">auto</option>
            <option value="default">default</option>
            <option value="none">none</option>
        </select>
    )
}
function StyleRule(props) {
    //{/* onChange={editor.replaceCss} onfocusin={editor.updateMatches} onfocusout{editor.removeMatches}*/}
    return (
        <form className="doc_has_match " data-index="4" data-selector=".usi_display button">
            <div className="input-group">
                <input name="selector" type="text" defaultValue=".usi_display button"/>
                <div className="css-line">
                    <input name="property" type="text" autoComplete="off"
                        value={props.property}
                        pattern="font-family|font-style|font-weight|font-size|line-height|letter-spacing|word-spacing|color|text-transform|text-decoration|text-align|text-indent|text-shadow|word-wrap|white-space|text-overflow|height|width|min-width|max-width|min-height|max-height|overflow|overflow-x|overflow-y|flex|flex-grow|flex-shrink|flex-basis|resize|position|top|right|bottom|left|margin|margin-top|margin-left|margin-bottom|margin-right|padding|padding-top|padding-left|padding-bottom|padding-right|clear|float|display|flex-direction|flex-wrap|flex-flow|justify-content|alignment-baseline|align-items|align-content|order|z-index|background|background-color|background-image|background-repeat|background-attachment|background-position|background-size|filter|border|border-width|border-style|border-color|border-radius|outline|outline-width|outline-style|outline-color|opacity|box-shadow|transition|transform|visibility|cursor|content|text-size-adjust|list-style-type|border-spacing|border-collapse|table-layout|direction|box-sizing"
                    />
                    <ValueInput />
                    <ValueSelect />
                </div>
            </div>
        </form>
    )
}
function Editor() {
    return (
        <div id="editor">
            <div id="tab_panels" className="scroll">
                <div className="editor_panel edit_tab editor_active">
                    <div className="attributes_tab">
                        <h3>Attributes</h3>
                        <Attribute />
                    </div>
                    <div className="styles_tab">
                        <details>
                            <summary>Styles</summary>
                            <StyleRule />
                        </details>
                    </div>
                    <div className="blocks_tab">
                        {config.blocks.map((blockGroup, i) =>  
                            <details key={blockGroup.name}>
                                <summary>{blockGroup.name}</summary>
                                {blockGroup.blocks.map((block, i) =>  
                                    <Block key={block.id} id={block.id} html={block.html} />
                                )}
                            </details>
                        )}
                        <details>
                            <summary>Elements</summary>
                            {Object.keys(elements).map((tagName, i) => {
                                return elements[tagName].html ? <Block key={tagName} id={tagName} html={elements[tagName].html} /> : "";
                            })}
                        </details>
                    </div>
                </div>
            </div>
        </div>
    );
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.toggleImages = this.toggleImages.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.changeZoom = this.changeZoom.bind(this);
        this.changeDevice = this.changeDevice.bind(this);
        this.toggleView = this.toggleView.bind(this);
        this.toggleOutlines = this.toggleOutlines.bind(this);
        this.state = {
            show_images: true,
            outlines: true,
            menuOpen: false,
            zoom: 1,
            view: "visual",
            device: "desktop"
        }
    }

    render() {
        return (
            <div>
                <Toolbar 
                    view={this.state.view}
                    device={this.state.device}
                    toggleImages={this.toggleImages}
                    toggleMenu={this.toggleMenu}
                    changeZoom={this.changeZoom}
                    changeDevice={this.changeDevice} 
                    toggleView={this.toggleView}
                    toggleOutlines={this.toggleOutlines}
                />
                <Menu 
                    open={this.state.menuOpen}
                    toggleMenu={this.toggleMenu}
                />
                <Canvas
                    show_images={this.state.show_images}
                    outlines={this.state.outlines}
                    device={this.state.device}
                    zoom={this.state.zoom}
                    html={config.templates[0].html} 
                />
                <div id="canvasNotice"></div>
                <Editor />
                <ul id="hint"></ul>
            </div>
        )
    }
    toggleImages(event) {
        alert("unfinished");
        this.setState((state, props) => {
            return {
                show_images: !this.state.show_images,
            }
        });
    }
    toggleOutlines(event) {
        alert("unfinished");
        this.setState((state, props) => {
            return {
                outlines: !this.state.outlines,
            }
        });
    }
    toggleMenu(event) {
        this.setState((state, props) => {
            return {
                menuOpen: !this.state.menuOpen,
            }
        });
    }
    changeZoom(event, to) {
        let canvas = document.querySelector("#canvas");
        let newT = 1;
        if (to == "in") {
            newT = this.state.zoom + 0.25;
        } else if (to == "out") {
            newT = this.state.zoom / 1.25;
        }
        this.setState((state, props) => {
            return {
                zoom: newT,
            }
        });
    }
    changeDevice (e) {
        e.persist();
        this.setState((state, props) => {
            return {
                device: e.target.value,
            }
        });
    }
    toggleView (e) {
        e.persist();
        this.setState((state, props) => {
            return {
                view: e.target.value,
            }
        });
    }
}

ReactDOM.render(<App/>, document.querySelector('#design_tool'));