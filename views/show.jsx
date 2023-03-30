const React = require('react')
const Default = require('./layouts/Default')

function Show ( {bread} ) {
    return (
      <Default title={bread.name + " Details"}>
        <main>
          <h2>{bread.name} Bread</h2>
          <h5>{bread.name} bread 
          {bread.hasGluten ?
          <span> has gluten.</span> :
          <span> does not have gluten.</span>}
          </h5>
          
          <img src={bread.image} alt={bread.name} />

          <div className='button-group'>
            <a href={`/breads/${bread.id}/edit`}><button className='editButton'>Edit</button></a>

            <form className='deleteButton' action={`/breads/${bread.id}?_method=DELETE`} method="POST">
              <input type='submit' value="DELETE" className='deleteButton' />
            </form>
            
          </div>
          <a href="/breads"><button className='newButton'>Return to Bread List</button></a>
        </main>
      </Default>
    )
}

module.exports = Show