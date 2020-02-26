export let bar = `
<style>
  #usi_container {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    background:#fff;
  }
  .usi_display * {
    font-family: inherit;
    font-size: 1em;
  }
  .usi_display {
    font-family: sans-serif;
    color:#000;
    width:100%;
    font-size: 18px;
    text-align:center;
  }
  .usi_content {
    padding: 0 2em;
  }
  #usi_close {
    position: absolute;
    top: 0;
    right: 0;
  }
  .usi_p {
  }
</style>
<script type="text/javascript">
</script>
<div id="usi_container">
  <div class="usi_display">
    <div class="usi_content">
      <button id="usi_close" class="usi_button" type="button" onclick="alert('Close')">&times;</button>
      <div class="usi_p1">
        <p class="usi_p">Your coupon will be applied at checkout</p>
      </div>
    </div>
  </div>
</div>
`;
