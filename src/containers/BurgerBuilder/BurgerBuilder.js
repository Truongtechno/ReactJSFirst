import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Model/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Loading/Loading';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as actionTypes from '../../store/action';


class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchaseAble: false,
      purchasing: false,
      loading: false
    };
  }

  updatePurchaseAble(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
      return sum > 0;
    // this.setState({
      // purchaseAble: sum > 0
    // });
  }

  purchaseHandler() {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler() {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler() {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          '=' +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  }

  componentDidMount() {
    // axios
    //   .get('https://react-my-burget-61813.firebaseio.com/ingredients')
    //   .then(response => {
    //     console.log('Response:', response);
    //   })
    //   .catch(err => {
    //     console.log('Error when get data:', err);
    //   });
  }

  render() {
    const disableInfo = {
      ...this.props.ingredients
    };

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    if (this.state.loading) {
    }
    let orderSummary = null;
    orderSummary = (
      <OrderSummary
        ingredients={this.props.ingredients}
        price={this.props.totalPrice}
        purchaseCanceled={() => this.purchaseCancelHandler()}
        purchaseContinue={() => this.purchaseContinueHandler()}
      />
    );
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={() => this.purchaseCancelHandler()}
        >
          {orderSummary}
        </Modal>
        <Burger ingredients={this.props.ingredients} />
        <BuildControls
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          disabled={disableInfo}
          price={this.props.totalPrice}
          purchaseAble={this.updatePurchaseAble(this.props.ingredients)}
          ordered={() => this.purchaseHandler()}
        />
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};

const mapDispathToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
      }),
    onIngredientRemoved: ingName =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(withErrorHandler(BurgerBuilder, axios));
