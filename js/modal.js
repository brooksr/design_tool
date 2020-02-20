export let modal = `
<style>
  body {
    --main-bg-color: #efefef;
    --main-font-color: #121212;
    --primary-color: dodgerblue;;
  }
  #usi_container {
    height:100%;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
  }
  .usi_name {
    font-weight:bold;

  }
  .usi_display * {
    font-family: inherit;
    font-size: 1em;
    margin: 0;
    padding: 0;
  }
  .usi_display {
    font-family: sans-serif;
    background: var(--main-bg-color);
    color:var(--main-font-color);
    max-width: 640px;;
    width:100%;
    position:fixed;
    left:50%;
    top:10%;
    transform: translateX(-50%);
    padding:1em;
    font-size: 18px;
    text-align:center;
    padding: 2em;
  }
  .usi_display button {
    cursor: pointer;
  }
  #usi_close {
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    border: none;
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 30px;
    text-align: center;
    color: var(--main-font-color);
  }
  #usi_submit {
    background: var(--primary-color);
    border: none;
    text-align: center;
    color: #fff;
    padding: 1em 2em;
    font-weight:bold;
  }
  #usi_close:after {
    content: "\\\u00D7";
  }
  .usi_display h1 {
    font-size: 2em;
    margin: 0;
  }
  .usi_display p {
    padding: 1em 0;
  }
  .usi_p1, .usi_p2 {display:none;}
  .usi_active {display:inherit;}

  .usi_row {
      display: flex;
  }
  .usi_col {
      flex: 1 0 auto;
  }
  @media screen and (max-width: 640px) {
    .usi_display {
      bottom:0;
      top: auto;
    }
  }
  @media screen and (min-width: 400px) {
    .usi_display {
      top:10%;
    }
    .usi_display h1 {
      font-size: 3em;
    }
    .usi_display p {
      font-size: 1.5em;
    }
  }
</style>
<script type="text/javascript">
  //debugger;
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
      <button id="usi_close" class="usi_button" type="button" aria-label="Close"></button>
      <h1 class="usi_h1">10% off your next purchase</h1>
      <p>Lorem ipsum dolor sit amet, colorium tempe fur freestul de retu des werd few sed wash ner opunmi.</p>
      <button id="usi_submit" class="usi_submit" type="button" aria-label="Close">Redeem Now</button>
    </div>
  </div>
</div>
`;
