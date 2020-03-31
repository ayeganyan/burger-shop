import React from 'react'

import '../../hocs/Aux'
import Aux from '../../hocs/Aux'

const layout = (props) => (
    <Aux>
        <div>Toolbar, sideDrawer, BackDrop</div>
        <main>
            {props.children}
        </main>
    </Aux>
)

export default layout