const React = require('react')
// const Default = require('./layouts/Default')

function Index ({title, breads, bakers}) {

    return (
    <>
        <h2>Bakers:</h2>
        <ul className='bread-list'>
            {bakers.map((baker) => {
                return (
                    <li key={baker._id}>
                        <a href={`/bakers/${baker._id}`}><h5>{baker.name}</h5></a>
                    </li>
                )
            })}
        </ul>

        <h2>Breads:</h2>
        <a href="/breads/new"><button className="newButton">Add a new bread</button></a>
        <ul className='bread-list'>
            {
                breads.map((bread) => {
                    return (
                        <li key={bread.id}>
                            <a href={`/breads/${bread.id}`}>
                                <h5>{bread.name}</h5>
                                <ul className='bread-attribute'>
                                    {/* <li>{bread.getBakedBy()}</li> */}
                                </ul>
                            </a>
                        </li>
                    )
                })
            }
        </ul>
        <a href="/breads/all"><button className="newButton">View All Breads</button></a>
    </>
    )
}

module.exports = Index
