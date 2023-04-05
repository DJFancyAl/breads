const React = require('react')
const Default = require('./layouts/Default')

function AllBreads ({title, breads}) {

    return (
      <Default title={title}>
        <h2>All Breads:</h2>
        <a href="/breads/new"><button className="newButton">Add a new bread</button></a>
        <ul className='bread-list'>
            {
                breads.map((bread) => {
                    return (
                        <li key={bread.id}>
                            <a href={`/breads/${bread.id}`}>
                                <h5>{bread.name}</h5>
                                <ul className='bread-attribute'>
                                    <li>{bread.getBakedBy()}</li>
                                </ul>
                            </a>
                        </li>
                    )
                })
            }
        </ul>
        <a href="/breads/"><button className="newButton">Return to Index</button></a>
      </Default>
    )
}

module.exports = AllBreads
