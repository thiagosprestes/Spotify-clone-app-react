import React from 'react';

import { Provider } from 'react-redux';

import store from '../../store';    

import './styles.css';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Player from '../../components/Player';

function Body(props) {
    return(
        <Provider store={store}>
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
        </Provider>
    )
}

export default Body;