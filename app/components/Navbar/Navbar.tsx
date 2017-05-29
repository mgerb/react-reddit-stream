import React from 'react';
import { Link, NavLink } from 'react-router-dom';

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
                    <NavLink to="/r/all" className="Navbar__item" exact activeClassName="Navbar__item--active">All</NavLink>
                    <NavLink to="/r/popular" className="Navbar__item" exact activeClassName="Navbar__item--active">Popular</NavLink>
                    {/*<NavLink to="/new" className="Navbar__item" exact activeClassName="Navbar__item--active">New</NavLink>*/}

                    <div className="Navbar__item Navbar__dropdown">
                        <span>Top</span>
                        <div className="Navbar__dropdown__list">
                            <Link to="?sort=top&t=hour" className="Navbar__dropdown__list__item">past hour</Link>
                            <Link to="?sort=top&t=day" className="Navbar__dropdown__list__item">past 24 hours</Link>
                            <Link to="?sort=top&t=week" className="Navbar__dropdown__list__item">past week</Link>
                            <Link to="?sort=top&t=month" className="Navbar__dropdown__list__item">past month</Link>
                            <Link to="?sort=top&t=year" className="Navbar__dropdown__list__item">past year</Link>
                            <Link to="?sort=top&t=all" className="Navbar__dropdown__list__item">all time</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

