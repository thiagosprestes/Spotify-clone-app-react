import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import getHashParams from '../../utils/getHashParams';

function Home() {
    const [ token, setToken ] = useState(getHashParams().access_token);

    const history = useHistory();
    
    function logout() {
        setToken(null);
        history.push('/login');
    }
    return (
        <div>
            <h1>AAAAAA</h1>
            <Link to="/login"><button>Login</button></Link>
            <button onClick={logout}>Sair</button>
        </div>
    )
}

export default Home;