export const emailBlocks = [
  {
    id: "preheader",
    html: `<div class="preheader">
    (Optional) This text will appear in the inbox preview, but not the email body. It can be used to supplement the email subject line or even summarize the email's contents. Extended text preheaders (~490 characters) seems like a better UX for anyone using a screenreader or voice-command apps like Siri to dictate the contents of an email. If this text is not included, email clients will automatically populate it using the text (including image alt text) at the start of the email's body.
    </div>
    <div class="preheader">
    &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
    </div>`
  }, {
    id: "logo",
    html: `<tr>
    <td class="padded text-center">
      <img src="https://via.placeholder.com/200x50" width="200" height="50" alt="ALT">
    </td>
</tr>`
  }, {
    id: "hero",
    html: `<tr>
    <td class="content-bg">
      <img src="https://via.placeholder.com/1200x600" width="600" height="" alt="ALT" style="width: 100%; max-width: 600px; margin: auto; display: block;">
    </td>
</tr>`
  }, {
    id: "text",
    html: `<tr>
    <td class="content-bg">
        <table width="100%">
            <tr>
                <td class="padded text">
                    <h1>Praesent laoreet malesuada&nbsp;cursus.</h1>
                    <p>Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent laoreet malesuada cursus. Maecenas scelerisque congue eros eu posuere. Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</p>
                    <ul>
                        <li>A list item.</li>
                        <li>Another list item here.</li>
                        <li>Everyone gets a list item, list items for everyone!</li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td class="button button-center">
                    <table align="center">
                        <tr>
                            <td class="button-td button-td-primary">
                               <a class="button-a button-a-primary" href="https://google.com/">Centered Primary Button</a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </td>
</tr>`
  }, {
    id: "background area",
    html: `<tr>
    <td valign="middle" class="background-image dark-bg">
        <!--[if gte mso 9]><v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;height:175px; background-position: center center !important;"> <v:fill type="tile" src="https://via.placeholder.com/600x230/222222/666666" color="#222222" /> <v:textbox inset="0,0,0,0"><![endif]-->
        <div>
            <table width="100%">
                <tr>
                    <td valign="middle" class="padded text text-center">
                        <p>Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent laoreet malesuada cursus. Maecenas scelerisque congue eros eu posuere. Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</p>
                    </td>
                </tr>
            </table>
        </div>
        <!--[if gte mso 9]></v:textbox> </v:rect> <![endif]-->
    </td>
</tr>`
  }, {
    id: "2 col",
    html: `<tr>
    <td class="padded content-bg">
        <table width="100%">
            <tr>
                <th valign="top" width="50%" class="stack-column-center">
                    <table width="100%">
                        <tr>
                            <td class="padded text-center">
                              <img src="https://via.placeholder.com/270" width="270" height="" alt="ALT" style="width: 100%; max-width: 270px;">
                            </td>
                        </tr>
                        <tr>
                            <td class="text center-on-narrow">
                                <p>Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                            </td>
                        </tr>
                    </table>
                </th>
                <th valign="top" width="50%" class="stack-column-center">
                    <table width="100%">
                        <tr>
                            <td class="padded text-center">
                              <img src="https://via.placeholder.com/270" width="270" height="" alt="ALT" style="width: 100%; max-width: 270px;">
                            </td>
                        </tr>
                        <tr>
                            <td class="text center-on-narrow">
                                <p>Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                            </td>
                        </tr>
                    </table>
                </th>
            </tr>
        </table>
    </td>
</tr>`
  }, {
    id: "3 col",
    html: `<tr>
    <td class="padded content-bg">
        <table width="100%">
            <tr>
                <th valign="top" width="33.33%" class="stack-column-center">
                    <table width="100%">
                        <tr>
                            <td class="padded text-center">
                              <img src="https://via.placeholder.com/270" width="270" height="" alt="ALT" style="width: 100%; max-width: 270px;">
                            </td>
                        </tr>
                        <tr>
                            <td class="text center-on-narrow">
                                <p>Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                            </td>
                        </tr>
                    </table>
                </th>
                <th valign="top" width="33.33%" class="stack-column-center">
                    <table width="100%">
                        <tr>
                            <td class="padded text-center">
                              <img src="https://via.placeholder.com/270" width="270" height="" alt="ALT" style="width: 100%; max-width: 270px;">
                            </td>
                        </tr>
                        <tr>
                            <td class="text center-on-narrow">
                                <p>Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                            </td>
                        </tr>
                    </table>
                </th>
                <th valign="top" width="33.33%" class="stack-column-center">
                    <table width="100%">
                        <tr>
                            <td class="padded text-center">
                              <img src="https://via.placeholder.com/270" width="270" height="" alt="ALT" style="width: 100%; max-width: 270px;">
                            </td>
                        </tr>
                        <tr>
                            <td class="text center-on-narrow">
                                <p>Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                            </td>
                        </tr>
                    </table>
                </th>
            </tr>
        </table>
    </td>
</tr>`
  }, {
    id: "1/3 and 2/3",
    html: `<tr>
    <td dir="ltr" width="100%" class="padded content-bg">
        <table width="100%">
            <tr>
                <th width="33.33%" class="stack-column-center">
                    <table width="100%">
                        <tr>
                            <td dir="ltr" valign="top" style="padding: 0 10px;">
                              <img src="https://via.placeholder.com/170" width="170" height="170" alt="ALT" class="center-on-narrow">
                            </td>
                        </tr>
                    </table>
                </th>
                <th width="66.66%" class="stack-column-center">
                    <table width="100%">
                        <tr>
                            <td dir="ltr" valign="top" class="padded text center-on-narrow">
                                <h2>Class aptent taciti sociosqu</h2>
                                <p>Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                                <table class="center-on-narrow" style="float:left;">
                                    <tr>
                                        <td class="button-td button-td-primary">
                                          <a class="button-a button-a-primary" href="https://google.com/">Primary Button</a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </th>
            </tr>
        </table>
    </td>
</tr>`
  },, {
    id: "Spacer",
    html: `<tr>
    <td aria-hidden="true" height="40" class="spacer"></td> &nbsp;</td>
</tr>`
  },, {
    id: "text 2",
    html: `<tr>
    <td class="content-bg">
        <table width="100%">
            <tr>
                <td class="padded text"> Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent laoreet malesuada cursus. Maecenas scelerisque congue eros eu posuere. Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</td>
            </tr>
        </table>
    </td>
</tr>`
  },, {
    id: "footer",
    html: `<table align="center" width="600" class="email-container">
    <tr>
        <td class="padded text text-center" >
            <a href="https://www.google.com/" class="link" style="font-weight: bold;">View as a Web Page</a>
            <br>
            <br> Company Name
            <br><span class="unstyle-auto-detected-links">123 Fake Street, SpringField, OR, 97477 US<br>(123) 456-7890</span>
            <br>
            <br>
            <a href="https://www.google.com/" class="link">unsubscribe</a>
        </td>
    </tr>
</table>`
  },, {
    id: "Full width",
    html: `<table width="100%" class="primary-bg">
    <tr>
        <td>
            <div align="center" class="email-container">
                <!--[if mso]><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" align="center"><tr><td><![endif]-->
                <table width="100%">
                    <tr>
                        <td class="padded text">
                            <p>Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent laoreet malesuada cursus. Maecenas scelerisque congue eros eu posuere. Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</p>
                        </td>
                    </tr>
                </table>
                <!--[if mso]></td></tr></table><![endif]-->
            </div>
        </td>
    </tr>
</table>`
  }
];
