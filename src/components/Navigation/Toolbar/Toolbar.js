import React from 'react';

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import ToggleDrawer from '../SideDrawer/DrawerToggle/DrawerToggle'
import classes from './Toolbar.module.css'

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <ToggleDrawer clicked={props.clickMenu} />
            <div className={classes.Logo}>
                <Logo />
            </div>
            <div className={classes.DesktopOnly}>
                <NavigationItems />
            </div>
        </header>
    );
};

export default Toolbar;