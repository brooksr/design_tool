export let modal = `
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
    padding: 3em 2em;
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
  .usi_p1, .usi_p2 {display:none;}
  .usi_active {display:inherit;}
</style>
<script type="text/javascript">
debugger;
	window.usi_js = {
    	show: function(name){
          var usi_name = document.querySelector(name);
          var usi_active = document.querySelector(".usi_active");
          usi_active.classList.remove("usi_active");
          usi_name.classList.add("usi_active");
        }

    }
</script>
<div id="usi_container">
  <div class="usi_display">
    <div class="usi_content">
      <button id="usi_close" class="usi_button" type="button" onclick="alert('Close')">&times;</button>
      <div class="usi_p1 usi_active">
        <h1 class="usi_h">Sit. Stay. Shop!</h1>
        <p class="usi_p">Enter your email and receive 15% off your next order.</p>
        <label class="usi_label" for="usi_email">Email address</label>
        <input class="usi_input" id="usi_email" name="usi_email" type="email" autocomplete="email" placeholder="Enter your email">
        <button class="usi_button" type="button" onclick="debugger;usi_js.show('.usi_p2')">Redeem Now</button>
      </div>
      <div class="usi_p2">
        <h1 class="usi_h">Thanks!</h1>
        <p class="usi_p">Your email will be delivered soon.</p>
        <button class="usi_button" type="button" onclick="alert('Continue')">Continue</button>
      </div>
    </div>
  </div>
</div>`;
