import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Body from './components/Body';

import Login from './pages/Login';
import Home from './pages/Home';

import getHashParams from './utils/getHashParams';

const token = getHashParams().access_token;

function PrivateRoute({ component: Component, ...rest }) {
    return(
        <Route {...rest} 
            render={props => 
                    token !== undefined ? (<Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                )
            } 
        />
    )
}

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/login" component={Login} />     
            <Body>
                <PrivateRoute path="/" component={Home} />
            </Body>
        </Switch>
    </BrowserRouter>
)

export default Routes;