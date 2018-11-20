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
import * as burgerBuilderActions from '../../store/actions';

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchaseAble: false,
      purchasing: false,
    };
  }

  updatePurchaseAble(ingredients) {
    if(ingredients) {
      const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
      return sum > 0;
    }
    return false;
  }

  purchaseHandler() {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler() {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler() {
    this.props.history.push('/checkout');
  }

  componentDidMount() {
    this.props.onInitIngredients();
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
    let error ;
    if (this.props.error) {
      error = <p>Have some error when init data</p>
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
        {
          error
        }
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
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
};

const mapDispathToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: ingName => dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(withErrorHandler(BurgerBuilder, axios));
