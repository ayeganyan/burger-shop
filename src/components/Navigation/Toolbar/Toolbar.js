import React from 'react';

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './Toolbar.module.css'

const Toolbar = () => {
    return (
        <header className={classes.Toolbar}>
            <div>MENU</div>

            <div className={classes.DesktopOnly}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <NavigationItems />
            </div>
        </header>
    );
};

export default Toolbar;