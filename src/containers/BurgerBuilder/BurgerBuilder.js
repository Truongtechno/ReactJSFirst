import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Model/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Loading/Loading';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler';
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
            ingredients: {
                salad: 1,
                bacon: 1,
                cheese: 2,
                meat: 2
            },
            totalPrice: 4,
            purchaseAble: false,
            purchasing: false,
            loading: false
        }
    }

    updatePurchaseAble(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0)
        this.setState({
            purchaseAble: sum > 0
        })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updateCount;
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseAble(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updateCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updateCount;
        const priceDeduction = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseAble(updatedIngredients);
    }

    purchaseHandler() {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler() {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler() {
        // this.setState({ loading: true })
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Truongtechnoxxxx',
        //         address: {
        //             street: 'Hanoi',
        //             zipCode: '6789',
        //             country: 'Vietnam'
        //         },
        //         emai: 'truongdeptrai@gmail.com',
        //         deliveryMethod: 'Deptrai'
        //     }
        // }
        // axios.post('/order', order, {
        //     headers: {
        //         'Access-Control-Allow-Origin': '*'
        //     }
        // })
        //     .then(response => {
        //         this.setState({ loading: false, purchasing: false })
        //         console.log('Success:', response);
        //     })
        //     .catch(error => {
        //         this.setState({ loading: false, purchasing: false })
        //         console.log('Error:', error);
        //     })
        const queryParams  = [];
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    }

    componentDidMount() {
        axios.get('https://react-my-burget-61813.firebaseio.com/ingredients')
        .then(response => {
            console.log('Response:', response);
        })
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        }

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        if (this.state.loading) {

        }
        let orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCanceled={() => this.purchaseCancelHandler()}
            purchaseContinue={() => this.purchaseContinueHandler()}
        />
        if(this.state.loading) {
            orderSummary = <Spinner/>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={() => this.purchaseCancelHandler()}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disableInfo}
                    price={this.state.totalPrice}
                    purchaseAble={this.state.purchaseAble}
                    ordered={() => this.purchaseHandler()}
                />
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);