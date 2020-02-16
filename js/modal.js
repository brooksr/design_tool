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
  .usi_display button {
    cursor: pointer;
  }
  #usi_close {
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    font-size: 0;
    border: none;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #888;
  }
  #usi_close:after {
    content: \t"\u00D7";
    font-size: 30px;
  }
  .usi_display h1 {
    font-size: 2em;
  }
  .usi_display p {
    padding: 1em 0;
  }
  .usi_p1, .usi_p2 {display:none;}
  .usi_active {display:inherit;}
  @media screen and (min-width: 400px) {
    .usi_display h1 {
      font-size: 3em;
    }
    .usi_display p {
      font-size: 2em;
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
      <button id="usi_close" class="usi_button" type="button" onclick="alert('Close')">Close</button>

    </div>
  </div>
</div>
`;
