import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderform: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "your name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "your street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "your zipcode",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 6,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "your country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "your email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        validation: {
          required: true,
        },
        value: "fastest",
        valid: true,
        touched: false,
      },
    },
    formIsValid: false,
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let key in this.state.orderform) {
      formData[key] = this.state.orderform[key].value;
    }
    console.log(formData);
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: formData,
    };
    axios
      .post("/order", order)
      .then((response) => {
        this.setState({ loading: false });
        // this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid ? true : false;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid ? true : false;
    }

    return isValid;
  }
  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderform,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderform: updatedOrderForm, formIsValid: formIsValid });
  };
  render() {
    let formInputElements = [];
    for (let key in this.state.orderform) {
      formInputElements.push({
        id: key,
        config: this.state.orderform[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formInputElements.map((formElement, index) => {
          return (
            <Input
              key={index}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              change={(event) =>
                this.inputChangedHandler(event, formElement.id)
              }
              inValid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
            />
          );
        })}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
