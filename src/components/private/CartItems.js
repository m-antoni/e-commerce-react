import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spinner } from '../layouts/Spinner';
import { getUserCart, handleCart, checkItem } from '../../redux/actions/cart/cart.actions';
import { priceFormat } from '../../helpers/common';
import { Link } from 'react-router-dom';

function CartItems({ cart: { cart_items, checkout }, checkItem ,handleCart, getUserCart }) {

    useEffect(() => {
        getUserCart();
    }, [])

    
    return (
        <div className="container mx-auto md:px-20 p-5 pt-32">
            <div className="grid grid-flow-col gap-x-8">
                <div className="col-span-8">
                    {
                        cart_items.length > 0  ? 
                            cart_items.map(item => (
                                <div className="py-5 bg-white w-full mx-auto mb-5"> 
                                    <div className="flex md:flex-row flex-col px-10 bg-white justify-between">
                                        <input onChange={e => checkItem(e, item)} type="checkbox" className="self-start" name="checked_item" value={false}/>
                                        <img className="h-full w-20 sm:mb-5 self-center" src={item.image}/>
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
                
                <div className="col-span-4">
                    <div className="bg-white py-5 px-3 w-full">
                        <div className="flex">
                            <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>
                            <div className="cursor-pointer hover:text-yellow-900 hover:underline font-semibold">Bagong Silang Caloocan City...</div>
                        </div>
                        <div className="border-2 text-yellow-900 my-2"></div>

                        <h1 className="mb-2 font-bold">Order Summary</h1>
                        <div className="flex justify-between mb-1">
                            <div className="font-medium text-sm text-gray-500">Subtotal ({ checkout ? checkout.items.length : 0} Items)</div>
                            <div className="font-bold text-yellow-900">$ { checkout ? checkout.subtotal : '0.00'}</div>
                        </div>
                        <div className="flex justify-between mb-5">
                            <div className="font-medium text-sm text-gray-500">Shipping Fee</div>
                            <div className="font-bold text-yellow-900">$ 0.00</div>
                        </div>

                        <div className="border-2 text-yellow-900 my-2"></div>

                        <div className="flex justify-between mb-10">
                            <div className="font-medium text-sm">Grand Total</div>
                            <div className="font-bold text-yellow-900">$ { checkout ? checkout.total : '0.00'}</div>
                        </div>
                        <button className="text-white bg-yellow-500 hover:bg-black py-2 px-3 w-full font-semibold">PROCEED TO CHECKOUT</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    cart: state.cart
})

export default connect(mapStateToProps, { handleCart, getUserCart, checkItem })(CartItems);
