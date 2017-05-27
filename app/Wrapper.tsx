import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Comments from './pages/Comments/Comments';
import NotFound from './pages/NotFound/NotFound';

//styling
import './scss/index.scss';

interface Props {
    
}

interface State {
    
}

export default class Wrapper extends React.Component<Props, State> {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navbar/>
                    <Switch>
                        <Route exact path="/r/:subreddit?" component={Home}/>
                        <Route exact path="/comments/:id" component={Comments}/>
                        <Redirect from="/" to="/r/all"/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
