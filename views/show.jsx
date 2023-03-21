const React = require('react')
const Default = require('./layouts/Default')

function Show ( {bread} ) {
    return (
      <Default title={bread.name + " Details"}>
        <h2>{bread.name} Bread</h2>
        <p>{bread.name} bread 
        {bread.hasGluten ?
        <span> has gluten.</span> :
        <span> does not have gluten.</span>}
        </p>
        
        <img src={bread.image} alt={bread.name} />
      </Default>
    )
}

module.exports = Show