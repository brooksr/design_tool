export const emailComponents = {
  "<body(.*?)>": (tag, attrs) => `
  <body width="100%" ${attrs}>
    <center ${attrs}>
    <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #222222;"><tr><td><![endif]-->`,
  "</body>": (tag, attrs) => `
  <!--[if mso | IE]></td></tr></table> <![endif]-->
  </center>
</body>`,
  "<main(.*?)>": (tag, attrs) => `<table align="center" ${attrs}>`,
  "</main>": (tag, attrs) => `</table>`,
  "<section(.*?)>": (tag, attrs) => `<table align="center" ${attrs}>`,
  "</section>": (tag, attrs) => `</table>`,
  "<footer(.*?)>": (tag, attrs) => `<table align="center" ${attrs}>`,
  "</footer>": (tag, attrs) => `</table>`,
  "<header(.*?)>": (tag, attrs) => `<tr ${attrs}><td>`,
  "</header>": (tag, attrs) => `</td></tr>`,
  "<figure(.*?)>": (tag, attrs) => `<tr ${attrs}><td>`,
  "</figure>": (tag, attrs) => `</td></tr>`,
  "<article(.*?)>": (tag, attrs) => `<tr ${attrs}><td>`,
  "</article>": (tag, attrs) => `</td></tr>`,
  "<text(.*?)>": (tag, attrs) => `<tr><td ${attrs}>`,
  "</text>": (tag, attrs) => `</td></tr>`,
  "<button(.*?)>": (tag, attrs) => `<tr>
  <td ${attrs}>
      <table align="center">
          <tr>
              <td class="button-td button-td-primary">
                <a class="button-a button-a-primary" href="https://google.com/">`,
  "</button>": (tag, attrs) => `</a>
        </td>
      </tr>
    </table>
  </td>
</tr>`,
"<banner(.*?)>": (tag, attrs) => `<tr>
<td>
    <div align="center" ${attrs}>
        <!--[if mso]><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" align="center"><tr><td><![endif]-->
        <table width="100%">`,
"</banner>": (tag, attrs) => `</table>
        <!--[if mso]></td></tr></table><![endif]-->
    </div>
</td>
</tr>`,
};