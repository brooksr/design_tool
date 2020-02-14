export const email_components = {
  "<body.*?>": `
  <body width="100%" class="body">
    <center class="body">
    <!--[if mso | IE]>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #222222;"><tr><td>
    <![endif]-->`,
  "</body>": `
  <!--[if mso | IE]></td></tr></table> <![endif]-->
  </center>
</body>`,
  "<main.*?>": `<table align="center" class="email-container">`,
  "</main>": `</table>`,
  "<section.*?>": `<table align="center" class="email-container">`,
  "</section>": `</table>`,
  "<footer.*?>": `<table align="center" class="email-container">`,
  "</footer>": `</table>`,
  "<header.*?>": `<tr class="padded text-center"><td>`,
  "</header>": `</td></tr>`,
  "<figure.*?>": `<tr class="content-bg"><td>`,
  "</figure>": `</td></tr>`,
  "<article.*?>": `<tr class="content-bg"><td>`,
  "</article>": `</td></tr>`,
  "<text.*?>": `<tr><td class="padded text">`,
  "</text>": `</td></tr>`,
  "<button.*?>": `<tr>
  <td class="button button-center">
      <table align="center">
          <tr>
              <td class="button-td button-td-primary">
                <a class="button-a button-a-primary" href="https://google.com/">`,
  "</button>": `</a>
        </td>
      </tr>
    </table>
  </td>
</tr>`,
"<banner.*?>": `<tr>
<td>
    <div align="center" class="email-container">
        <!--[if mso]>
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" align="center"><tr><td>
        <![endif]-->
        <table width="100%">`,
"</banner>": `</table>
        <!--[if mso]>
        </td></tr></table>
        <![endif]-->
    </div>
</td>
</tr>`,
};