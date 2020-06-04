import React, { useCallback, useState } from 'react';

import { Provider } from 'react-redux';

import store from '../../store';

import './styles.css';

import Sidebar from '../Sidebar';
import Header from '../Header';
import Player from '../Player';

function Body({ children }) {
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = useCallback(
        () => setShowSidebar((value) => !value),
        []
    );

    return (
        <Provider store={store}>
            <div id="app">
                <aside style={showSidebar ? { left: 0 } : { left: '-230px' }}>
                    <Sidebar sidebarState={toggleSidebar} />
                </aside>
                <main
                    style={
                        showSidebar
                            ? { left: '230px', position: 'fixed' }
                            : { left: 0, position: 'inherit' }
                    }
                >
                    <Header
                        style={showSidebar ? { left: '230px' } : { left: 0 }}
                        sidebarState={toggleSidebar}
                    />
                    {children}
                </main>
                <footer>
                    <Player />
                </footer>
            </div>
        </Provider>
    );
}

export default Body;
