const React = require('react')

function Default(html) {
    return (
      <html>
      <head>
        <title>{html.title || 'Default'}</title>
      </head>
      <body>
        <h1>{html.title || 'HTML Rendered!'}</h1>
        {html.children}
      </body>
      </html>
    )
  }
  

module.exports = Default
