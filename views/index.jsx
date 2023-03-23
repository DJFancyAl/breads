const React = require('react')
const Default = require('./layouts/Default')

function Index ({title, breads}) {
    return (
      <Default title={title}>
        <h2>List of Breads:</h2>

        <ul className='bread-list'>
            {
                breads.map((bread, index) => {
                    return (
                        <li key={index}>
                            <a href={`/breads/${index}`}>
                                {bread.name}
                            </a>
                        </li>
                    )
                })
            }
        </ul>
      </Default>
    )
}

module.exports = Index
