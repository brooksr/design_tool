export const modal = `<style id="editor_styles">
[contenteditable] {
  outline: 1px dashed #333;
}
[data-status="active"] {
  outline: 2px dotted green;
}
[data-status="hover"] {
  outline: 2px dotted yellow;
}
:-moz-drag-over {
  outline: 1px solid yellow;
}
</style>
<style>
  .usi_display {
    background:#fff;
    color:#000;
    max-width:20em;
    width:100%;
    position:fixed;
    left:50%;
    margin-left: -10em;
    padding:1em;
  }
  h1 {
    font-style:italic;
    font-weight: bold;
    text-align: center;
  }
</style>
<div id="usi_container">
  <div class="usi_display">
    <div class="usi_content">
      <button type="button" onclick="alert('Close')">&times;</button>
      <h1 class="h1-style">Hey, wait, don't go!</h1>
      <p id="p" style="font-size: 10px">Lorem ipsum dolor sit amet.</p>
      <ul>
        <li>test 1</li>
        <li>num 2</li>
        <li>something 3</li>
        <li>444444444444444</li>
      </ul>
      <input type="text" value="Test value">
      <button type="button" onclick="alert('Send')">Send</button>
    </div>
  </div>
</div>`;
