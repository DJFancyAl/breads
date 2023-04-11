const React = require('react')
const Default = require('./layouts/default')

function Show ({baker}) {
    return (
      <Default>
          <h3>{baker.name}</h3>
          <p>{baker.name} has been baking with us since {baker.startDate.getFullYear()}</p>
          <p>About {baker.name}: {baker.bio}</p>
          <h3>Breads {baker.name} has baked</h3>
          <p>
            {baker.breads.map((bread => {
                return(
                    <a href={`/breads/${bread.id}`} key={bread.id} className='bakers'>{bread.name}</a>
                )
            }))}
          </p>
          <form className='deleteButton'  action={`/bakers/${baker.id}?_method=DELETE`} method="POST">
            <input type="submit" value={`Delete ${baker.name}`} className='deleteButton' />
          </form>
      </Default>
    )
}

module.exports = Show