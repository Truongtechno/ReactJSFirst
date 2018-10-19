import React from 'react';
import './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    //Video 113

    console.log('Ingredients:', props.ingredients);
    const transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            })
        });
    return (
        <div className="Burger">
            <BurgerIngredient type="bread-top" />
            {
                transformedIngredients
            }
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;