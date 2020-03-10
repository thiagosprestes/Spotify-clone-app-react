import React from 'react';

import './styles.css';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

function Body(props) {
    return(
        <div id="app">
            <aside>
                <Sidebar />
            </aside>
            <main>
                <Header />
                {props.children}
            </main>
        </div>
    )
}

export default Body;