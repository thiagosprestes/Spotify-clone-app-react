import React from 'react';

import './styles.css';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Player from '../../components/Player';

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
            <footer>
                <Player />
            </footer>
        </div>
    )
}

export default Body;