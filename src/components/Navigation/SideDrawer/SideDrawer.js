import React from 'react';

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import BackDrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hocs/Aux'

import classes from './SideDrawer.module.css'

const sideDrawer = (props) => {

    const attachedClasses = props.opened ? 
        [classes.SideDrawer, classes.Opene]:
        [classes.SideDrawer, classes.Close]
    return (
        <Aux>
            <BackDrop show={props.opened} clickHandler={props.closed}/>
            <div className={attachedClasses.join(" ")}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    )
}

export default sideDrawer;