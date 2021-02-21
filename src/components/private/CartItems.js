import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spinner } from '../layouts/Spinner';
import { getUserCart, handleCart } from '../../redux/actions/cart/cart.actions';
import { priceFormat } from '../../helpers/common';

function CartItems({ cart: { cart_items, loading }, handleCart, getUserCart }) {

    useEffect(() => {
        // getUserCart();
    }, [])

    
    return (
        <div className="container mx-auto md:px-20 p-5 pt-32">
            {
                cart_items.length > 0  ? 
                    cart_items.map(item => (
                        <div className="py-5 bg-white md:w-9/12 w-full mx-auto mb-5"> 
                            <div className="flex md:flex-row flex-col px-10 bg-white justify-between">
                                <img className="h-full w-20 sm:mb-5 self-center" src={item.image} alt=""/>
                                <div className="w-1/2">
                                    <h4 className="font-bold text-lg">{item.title}</h4>
                                    <p className="font-bold md:text-lg text-yellow-900">&#36; {priceFormat(item.price)}</p>
                                </div>
                                <div className="flex self-center h-auto">
                                    <svg onClick={() => handleCart('dec', item)} className="w-10 h-10 self-center cursor-pointer text-lg hover:text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>
                                    <input className="shadow p-2 w-16 h-10 mx-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded text-center font-bold text-red-900" value={item.qty} name="qty" type="number" disabled/>
                                    <svg onClick={() => handleCart('inc', item)} className="w-10 h-10 self-center cursor-pointer text-lg hover:text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path></svg>
                                </div>
                            </div>
                        </div>
                    ))
                : <h1>NO PRODUCTS TO DISPLAYS...</h1>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    cart: state.cart
})

export default connect(mapStateToProps, { handleCart, getUserCart })(CartItems);
