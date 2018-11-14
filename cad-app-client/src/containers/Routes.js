import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './Home';
import NotFound from './NotFound';

export default () =>
    <Switch>
        <Route path='/' exact component={Home} />
        {}
        <Route component={NotFound} />
    </Switch>;