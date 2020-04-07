import React, { useCallback, useState } from 'react';

import { Provider } from 'react-redux';

import store from '../../store';    

import './styles.css';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Player from '../../components/Player';

function Body(props) {
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = useCallback(() => setShowSidebar(value => !value));

    return(
        <Provider store={store}>
            <div id="app">
                <aside 
                    style={showSidebar ? {left: 0} : {left: '-230px'}}
                >
                    <Sidebar sidebarState={toggleSidebar} />
                </aside>
                <main 
                    style={showSidebar ? {left: '230px', position: 'fixed'} : {left: 0, position: 'inherit'}
                }>
                    <Header 
                        style={showSidebar ? {left: '230px'} : {left: 0}} 
                        sidebarState={toggleSidebar} 
                    />
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