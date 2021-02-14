import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux'

class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     price: 0
    // }

    componentWillMount () {
        // const query = new URLSearchParams( this.props.location.search );
        // const ingredients = {
        //     ...this.props.ingre
        // };
        // let price = 0;
        // for ( let param of query.entries() ) {
        //     // ['salad', '1']
        //     if (param[0] === 'price') {
        //         price = param[1];
        //     } else {
        //         ingredients[param[0]] = +param[1];
        //     }
        // }
        // this.setState( { ingredients: ingredients, totalPrice: this.props.price } );
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace( '/checkout/contact-data' );
    }

    render () {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => (<ContactData ingredients={this.props.ingredients} price={this.props.price} {...this.props} />)} />
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return{
        ingredients:state.ingredients,
        price:state.price
    }
}

export default connect(mapStateToProps)(Checkout);