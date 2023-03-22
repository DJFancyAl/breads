const React = require('react')
const Default = require('./layouts/Default')

function Show ( {bread, index} ) {
    return (
      <Default title={bread.name + " Details"}>
        <h2>{bread.name} Bread</h2>
        <p>{bread.name} bread 
        {bread.hasGluten ?
        <span> has gluten.</span> :
        <span> does not have gluten.</span>}
        </p>
        
        <img src={bread.image} alt={bread.name} />

        <div style={{display: "flex"}}>
          <a href={`/breads/${index}/edit`}><button>Edit</button></a>

          <form action={`/breads/${index}?_method=DELETE`} method="POST">
            <input type='submit' value="DELETE"/>
          </form>
        </div>

      </Default>
    )
}

module.exports = Show