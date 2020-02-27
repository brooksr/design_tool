'use strict';
import elements from './elements.js';

function Toolbar() {
    return (
        <div id="toolbar">
            <div className="button-group">
                <button type="button" id="openMenu">
                    <i className="fas fa-bars"></i>
                    <span className="tablet-tooltip">Menu</span>
                </button>
            </div>
            <div className="">
                <input id="assetName" type="text" placeholder="Enter asset name" defaultValue="" autoComplete="off"/>
                <button type="button" id="save">
                    <i className="far fa-save"></i>
                    <span className="tablet-tooltip">Save</span>
                </button>
            </div>
            {/* onChange={editor.toggleCode}*/}
            <div className="radio-buttons" id="editor-view">
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
            {/* onChange={editor.changeView}*/}
            <div className="radio-buttons visual_control" id="device-view">
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
                <button type="button" id="zoomIn">
                    <i className="fas fa-search-plus"></i>
                    <span className="tablet-tooltip">Zoom In</span>
                </button>
                <button type="button" id="zoomO">100%</button>
                <button type="button" id="zoomOut">
                    <i className="fas fa-search-minus"></i>
                    <span className="tablet-tooltip">Zoom Out</span>
                </button>
            </div>
            <div className="button-group visual_control">
                <button type="button" id="toggleOutlines">
                    <i className="fas fa-border-none"></i>
                    <span className="tablet-tooltip">Toggle Outlines</span>
                </button>
                <button type="button" id="toggleImages">
                    <i className="far fa-image"></i>
                    <span className="tablet-tooltip">Toggle Images</span>
                </button>
                <button type="button" id="manageImages">
                    <i className="far fa-images"></i>
                    <span className="tablet-tooltip">Manage Images</span>
                </button>
                <button type="button" id="sendTestEmail">
                    <i className="far fa-paper-plane"></i>
                    <span className="tablet-tooltip">EOA Test</span>
                </button>
                <button type="button" id="fullScreen">
                    <i className="fas fa-expand-arrows-alt"></i>
                    <span className="tablet-tooltip">Full Screen</span>
                </button>
                <button type="button" id="speak">
                    <i className="fas fa-voicemail"></i>
                    <span className="tablet-tooltip">Speak</span>
                </button>
            </div>
        </div>
    );
}

function Canvas(props) {
    return (
        <iframe id="canvas" srcDoc={props.srcDoc}>Loading</iframe>
    );
}

function Block (props) {
    return (
        <div className="block">
            <h5>{props.name}</h5>
            {/* onDragStart={editor.drag = document.createRange().createContextualFragment(this.innerHTML)}*/}
            <code id={props.name} draggable="true">{props.name}</code>
        </div>
    )
}
function Element(props) {
    //ondragstart="editor.drag = document.createRange().createContextualFragment(this.innerHTML)"*/}
    /*!!e.selfClosing ? `<${s} />` : `<${s}>placeholder</${s}>
    if (!!e.droppable) {
        <${s}><${e.droppable}>placeholders</${e.droppable}></${s}>
    }*/
    return (
        <div className="block">
            <h5>{props.tagName}</h5>
            <code draggable="true">{props.tagName}</code>
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
                    <input
                        value={props.property}
                        name="property"
                        type="text"
                        autoComplete="off"
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
                        <details>
                            <summary>Modal blocks</summary>
                            <Block />
                        </details>
                        <details>
                            <summary>Elements</summary>
                            {Object.keys(elements).map((tagName, i) => (
                                <Element tagName={tagName} key={i} />
                            ))}
                        </details>
                    </div>
                </div>
            </div>
        </div>
    );
}

function App() {
    return (
    <div>
        <Toolbar/>
        <Canvas/>
        <div id="canvasNotice"></div>
        <ul id="hint"></ul>
        <Editor/>
    </div>
    );
}

const domContainer = document.querySelector('#design_tool');
ReactDOM.render(
    <App/>
, domContainer);