import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

// container

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}


class BurgerBuilder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredients: null,
            totalPrice: 4,
            purchasable: false,
            purchasing: false,
            loading: false,
            error: false
        };
    }

    componentDidMount() {
        axios.get('https://react-my-burger-69179.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: response.data
                });
            }).catch(error => {
                this.setState({error: true})
            });
    }

    render() {

        const disabledInfo = {
            // Copy our state ingredients
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            // disabledInfo is a Boolean
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        let burger = this.state.error ? <p>ingredients can´t be loaded</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        ordered={this.purchaseHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler} />;
        }



        // This is disabledInfo  { salad: true, meat: false, ...}

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }

    // Handlers

    purchaseContinueHandler = () => {
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Carlos Castillo',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '41552',
                    country: 'México'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false, purchasing: false });
                console.log(response);
            })
            .catch(error => {
                this.setState({ loading: false, purchasing: false });
                console.log(error);
            });
    }

    // Arrow functions are methods that basically contain the state or the context of this
    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    updatePurchaseState(ingredients) {
        // Our const sum will get the key names of the ingredients Object
        const sum = Object.keys(ingredients)
            // with the map function we will get the values of all our keys as an array
            .map(igKey => {
                return ingredients[igKey];
            })
            // with reduce we will usa a fat arraw function to add all the elements in our array
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        console.log("QQQ", sum);
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        // It is not necessary to declare those constants with the initial word old but they help us to
        // illustrate what we are doing
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        // We will declare a new constant, updatedIngredients because the  state should be updated in an
        // immutable way. We use the ES6 spread operator to copy our state
        const updatedIngredients = {
            ...this.state.ingredients
        };
        // We update our copy
        updatedIngredients[type] = updatedCount;
        // We will do the same with our total price:
        // 1.- Create a copy of the actual value with the initial word old
        // 2.- Declare the variables that will change our copied value
        // 3.- Declare a variable that will hold the changes of values
        const oldPrice = this.state.totalPrice;
        const priceAddition = INGREDIENTS_PRICES[type];
        const newPrice = oldPrice + priceAddition;
        // Finally update our state array with our copies
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        // We call this method to check for our purchase state
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const priceDeduction = INGREDIENTS_PRICES[type];
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        // We call this method to check for our purchase state
        this.updatePurchaseState(updatedIngredients);
    }

}

export default withErrorHandler(BurgerBuilder, axios);