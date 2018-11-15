import React from "react";
import styles from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux'

const sideDrawer = ( props ) => {

    let attachedClasses = [styles.SideDrawer, styles.Close];
    if (props.open) {
        attachedClasses = [styles.SideDrawer, styles.Open];
    }
    //className={attachedClasses.join('')}

    return (
        <Aux>
        <Backdrop show={props.open} clicked={props.closed} />
        <div className={attachedClasses.join(' ')}>
            <div className={styles.Logo}>
                <Logo />
            </div>
            <nav></nav>
            <NavigationItems />
        </div>
        </Aux>
    );
};

export default sideDrawer;