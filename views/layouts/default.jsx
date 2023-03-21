const React = require('react')

function Default(html) {
    return (
      <html>
      <head>
        <title>{html.title || 'HTML Rendered!'}</title>
      </head>
      <body>
        {html.children}
      </body>
      </html>
    )
  }
  

module.exports = Default
