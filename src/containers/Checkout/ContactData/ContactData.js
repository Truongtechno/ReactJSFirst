import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Loading/Loading';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler';
import * as acitons from '../../../store/actions';
import './ContactData.css';

class ContactData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderForm: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Name'
          },
          value: '',
          validation: {
            required: true
          },
          valid:  false,
          touched: false,
        },
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Street'
          },
          value: '',
          validation: {
            required: true
          },
          valid:  false,
          touched: false,
        },
        zipCode: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'ZIP CODE'
          },
          value: '',
          validation: {
            required: true
          },
          valid:  false,
          touched: false,
        },
        country: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Country'
          },
          value: '',
          validation: {
            required: true
          },
          valid:  false,
          touched: false,
        },
        emai: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your E-Mail'
          },
          value: '',
          validation: {
            required: true
          },
          valid:  false,
          touched: false,
        },
        deliveryMethod: {
          elementType: 'select',
          elementConfig: {
            options: [
              { value: 'fastest', displayValue: 'Fastest' },
              { value: 'cheapeas', displayValue: 'Cheapeas' }
            ]
          },
          value: '',
          valid: true
        }
      }

    };
  }

  checkValidity(value, rules) {
    let isValid = false;
    if(rules && rules.required) {
      isValid = value.trim() !== '';
    }
    return isValid;
  }

  orderHandler = event => {
    event.preventDefault();
    const formData = {};
    for (let formElement  in this.state.orderForm){
      formData[formElement] = this.state.orderForm[formElement].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.totalPrice,
      orderData: formData
    };
    this.props.onOrderBurger(order);
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedForm = {
      ...this.state.orderForm
    }
    updatedForm[inputIdentifier].value  = event.target.value;
    updatedForm[inputIdentifier].valid = this.checkValidity(event.target.value,updatedForm[inputIdentifier].validation);
    updatedForm.touched = true;

    this.setState({
      orderForm: updatedForm
    });
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler} >
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event,formElement.id)}
          />
        ))}
        <Button btnType="Success"
        >
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className="ContactData">
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData) => dispatch(acitons.purchaseBurger(orderData))
  }
}

export default connect(mapStateToProps)(withErrorHandler(ContactData, axios));