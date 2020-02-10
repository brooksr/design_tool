export const modal = `
<style>
  #usi_container {
    height:100%;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
  }
  .usi_display * {
    font-family: inherit;
    font-size: 1em;
  }
  .usi_display {
    font-family: sans-serif;
    background:#fff;
    color:#000;
    max-width:40em;
    width:100%;
    position:fixed;
    left:50%;
    transform: translateX(-50%);
    padding:1em;
    font-size: 18px;
    text-align:center;
    padding: 3em 0;
  }
  #usi_close {
    position: absolute;
    top: 0;
    right: 0;
  }
  .usi_h {
    font-size: 2em;
  }
  .usi_p {
    padding: 1em 0;
  }
</style>
<div id="usi_container">
  <div class="usi_display">
    <div class="usi_content">
      <button id="usi_close" class="usi_button" type="button" onclick="alert('Close')">&times;</button>
      <h1 class="usi_h">Sit. Stay. Shop.</h1>
      <p class="usi_p">Enter your email and receive 15% off your next order.</p>
      <form>
        <label class="usi_label" for="usi_email">Email address</label>
        <input class="usi_input" id="usi_email" name="usi_email" type="email" autocomplete="email" placeholder="Enter your email">
        <button class="usi_button" type="button" onclick="alert('Send')">Redeem Now</button>
      </form>
    </div>
  </div>
</div>`;
