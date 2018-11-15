import React, { Component } from 'react';
import styles from './BurgerIngredient.css';
// PropTypes is an external React library that allows us to verify the tipes of properties
// a component is receiving
import PropTypes from 'prop-types';

class BurgerIngredient extends Component {
    render() {
        let ingredient = null;
        switch (this.props.type) {
            case ('bread-top'):
                ingredient = (
                    <div className={styles.BreadTop}>
                        <div className={styles.Seeds1}></div>
                        <div className={styles.Seeds2}></div>
                    </div>
                );
                break;
            case ('meat'):
                ingredient = <div className={styles.Meat}></div>
                break;
            case ('bread-bottom'):
                ingredient = <div className={styles.BreadBottom}></div>;
                break;
            case ('cheese'):
                ingredient = <div className={styles.Cheese}></div>;
                break;
            case ('salad'):
                ingredient = <div className={styles.Salad}></div>;
                break;
            case ('bacon'):
                ingredient = <div className={styles.Bacon}></div>;
                break;
            default: 
                ingredient= null;
                break;   
        }
        return ingredient;
    }


};

// We add the object propTypes to Person so the library prop-types will check if the properties 
// that are send to Persons are the type they need to be
BurgerIngredient.propTypes = {
    type: PropTypes.string
};

export default BurgerIngredient;