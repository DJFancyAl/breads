const React = require('react')
const Default = require('./layouts/Default')

function Bread (bread) {

    return (
      <Default title={bread.name + " Details"}>
        <h2>{bread.name} Bread</h2>
        {bread.hasGluten ?
        <p>{bread.name} bread has gluten.</p> :
        <p>{bread.name} bread doesn't have gluten.</p>}
        <img src={bread.image} alt="bread" width="800" />

      </Default>
    )
}

module.exports = Bread