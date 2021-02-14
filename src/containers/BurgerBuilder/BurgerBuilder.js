import React, { Component } from 'react';
import {connect} from 'react-redux'
import Aux from '../../hoc/_Aux/_Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get( '/ingredients' )
            .then( response => {
                this.props.onAddIngredients(response.data)
            } )
            .catch( error => {
                this.setState( { error: true } );
            } );
    }

    updatePurchaseState ( ingredients ) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        this.setState( { purchasable: sum > 0 } );
    }

    addIngredientHandler = ( type ) => {
        const oldCount = this.props.ingre[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.props.ingre
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.props.price;
        const newPrice = oldPrice + priceAddition;
        this.props.onSetPrice(newPrice,updatedIngredients)
        this.updatePurchaseState( updatedIngredients );
    }

    removeIngredientHandler = ( type ) => {
        const oldCount = this.props.ingre[type];
        if ( oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.props.ingre
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.props.price;
        const newPrice = oldPrice - priceDeduction;
        this.props.onSetPrice(newPrice,updatedIngredients)
        this.updatePurchaseState( updatedIngredients );
    }

    purchaseHandler = () => {
        this.setState( { purchasing: true } );
    }

    purchaseCancelHandler = () => {
        this.setState( { purchasing: false } );
    }

    purchaseContinueHandler = () => {
        // alert('You continue!');
        
        // const queryParams = [];
        // for (let i in this.props.ingre) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingre[i]));
        // }
        // queryParams.push('price=' + this.props.price);
        // const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout'
            // search: '?' + queryString
        });
    }

    render () {
        const disabledInfo = {
            ...this.props.ingre
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if ( this.props.ingre ) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingre} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.props.price} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ingre}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }
        if ( this.state.loading ) {
            orderSummary = <Spinner />;
        }
        // {salad: true, meat: false, ...}
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        ingre:state.ingredients,
        price:state.price
    }   
}

const mapStateToDispatch = (dispatch) =>{
    return{
        onAddIngredients:(ingre)=>dispatch({type:'INGREDIENTS',ingre:ingre}),
        onSetPrice:(price,ingre)=>dispatch({type:'PRICE',price:price,ingre:ingre})
    }
}

export default connect(mapStateToProps,mapStateToDispatch)(withErrorHandler(BurgerBuilder, axios ));