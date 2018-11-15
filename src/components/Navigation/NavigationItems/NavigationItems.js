import React from 'react';
import styles from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => {
    return (
        <ul className={styles.NavigationItems}>
           <NavigationItem link="/" active={true}> Burger Builder </NavigationItem>
           <NavigationItem link="/"> Checkout </NavigationItem >
        </ul>
    );
}

export default navigationItems;