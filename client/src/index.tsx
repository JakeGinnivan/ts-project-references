import React from 'react'
import { render } from 'react-dom'

render(<Root />, document.querySelector('#index'))

function Root(): JSX.Element {
    return (
        <div>
            <h1>Todo app</h1>
        </div>
    )
}
