import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.scss';

interface Props {
    
}

interface State {
    
}

export default class Navbar extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }    

    render() {
        return (
            <div className="Navbar">
                <div className="Navbar__header">
                    <span>React Reddit</span>
                    <a href="https://github.com/mgerb/react-webpack2-seed">GitHub
                        <i className="fa fa-github" aria-hidden="true"/>
                    </a>
                </div>
                
                <div className="Navbar__nav">
                    <NavLink to="/" className="Navbar__item" exact activeClassName="Navbar__item--active">Home</NavLink>
                    {/*<NavLink to="/new" className="Navbar__item" exact activeClassName="Navbar__item--active">New</NavLink>*/}
                </div>
            </div>
        );
    }
}

