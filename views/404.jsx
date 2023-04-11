const React = require('react')
const Default = require('./layouts/default')

function noPage () {
    return (
        <Default title="Breads - Page not found">
            <h2>404 - Page Not Found</h2>
            <p>Oh no! This page does not exist. Please return to the <a href="/breads">breads page.</a></p>
        </Default>
    )
}

module.exports = noPage