import React from "react";
import styles from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
    console.log("[Burger.js] transformedIngredients_1: ", Object.keys(props.ingredients) );
    // expected output: ["salad", "bacon", "cheese", "meat"]
    console.log("[Burger.js] transformedIngredients_2: ", 
    Object.keys(props.ingredients)
        .map( ingredientKey => {
        console.log(props.ingredients[ingredientKey]);     
        return [...Array(props.ingredients[ingredientKey])]
        })
    );
    
    // With our prop ingredients that is an object we want to create an array with as many ingredients
    // of a type, for example: ["cheese","cheese","cheese"] and them map those values to JSX
    let transformedIngredients = Object.keys(props.ingredients)
        .map( ingredientKey => {
            return [...Array(props.ingredients[ingredientKey])].map((value, i)=> {
               return <BurgerIngredient key={ingredientKey + i} type={ingredientKey}/>;
            })
        });

     console.log( "[Burger.js] transformedIngredients_3: ", transformedIngredients );

       const transformedIngredientsLength = transformedIngredients.reduce( (arr,el) =>  {
          return arr.concat(el);
        }  , [] ).length;

        if ( transformedIngredientsLength === 0 ){
            transformedIngredients = <p>Please Start Adding Ingredients!</p>
        }

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            { transformedIngredients }
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    );
};

export default burger;