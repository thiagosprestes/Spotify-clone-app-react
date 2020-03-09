import React from 'react';

import './styles.css';

import Sidebar from '../../components/Sidebar';

function Body(props) {
    return(
        <div id="app">
            <aside>
                <Sidebar />
            </aside>
            <main>
                {props.children}
            </main>
        </div>
    )
}

export default Body;