import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spinner } from '../layouts/Spinner';
import { getUserCart, handleCart, checkItem, checkedGroup, removeWarning } from '../../redux/actions/cart/cart.actions';
import { priceFormat } from '../../helpers/common';
import { Link } from 'react-router-dom';

function CartItems({ cart: { cart_items, checkout, checked_group }, checkItem ,handleCart, getUserCart, checkedGroup, removeWarning }) {

    useEffect(() => {
        getUserCart();
    }, [])

    return (
        <div className="container mx-auto md:px-20 p-5 pt-32">
            <div className="grid grid-flow-col gap-x-8">
                <div className="col-span-8">
                    <div className="py-5 bg-white w-full mx-auto mb-5"> 
                        <div className="flex md:flex-row flex-col px-10 bg-white justify-between">
                            <div>
                                <input onChange={checkedGroup} type="checkbox" className="self-center" id="select-all" name="checked_item" checked={checked_group}/> 
                                <label className="text-sm text-gray-500 font-bold pl-5 cursor-pointer hover:text-yellow-900" for="select-all">SELECT ALL ({cart_items.length} Items)</label>
                            </div>
                            {
                                checkout.items.length > 0 && <svg onClick={() => removeWarning()} className="w-6 h-6 text-gray-500 self-center hover:text-red-500 cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                            }
                        </div>
                    </div>
                    {
                        cart_items.length > 0  ? 
                            cart_items.map(item => (
                                <div className="py-5 bg-white w-full mx-auto mb-5"> 
                                    <div className="flex md:flex-row flex-col px-10 bg-white justify-between">
                                        <input onChange={e => checkItem(e, item)} type="checkbox" className="self-start" name="checked_item" checked={item.checked}/>
                                        <img className="w-10 self-center" src={item.image}/>
                                        <div className="w-1/2 flex flex-col self-center">
                                            <h4 className="font-bold text-lg">{item.title}</h4>
                                            <p className="text-sm text-gray-500">{item.description.slice(0, 100) + (item.title.length > 100 ? "..." : "...")}</p>
                                        </div>
                                        <div className="flex self-center">
                                            <p className="font-bold text-lg text-yellow-900"><span className="font-medium text-sm text-gray-500">Price: </span>&#36; {priceFormat(item.price)}</p>
                                        </div>
                                        <div className="flex self-center h-auto">
                                            {
                                                item.qty == 1 ? <svg className="w-10 h-10 self-center text-lg text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg> :
                                                <svg onClick={() => handleCart('dec', item)} className="w-10 h-10 self-center cursor-pointer text-lg hover:text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>
                                            }
                                            
                                            <input className="shadow p-2 w-14 h-10 mx-1 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded text-center font-bold text-red-900" value={item.qty} name="qty" type="number" disabled/>
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
                            <div className="font-bold text-yellow-900">$ { checkout ? priceFormat(checkout.subtotal) : '0.00'}</div>
                        </div>
                        <div className="flex justify-between mb-5">
                            <div className="font-medium text-sm text-gray-500">Shipping Fee</div>
                            <div className="font-bold text-yellow-900">$ 0.00</div>
                        </div>

                        <div className="border-2 text-yellow-900 my-2"></div>

                        <div className="flex justify-between mb-10">
                            <div className="font-medium text-sm">Grand Total</div>
                            <div className="font-bold text-yellow-900">$ { checkout ? priceFormat(checkout.total) : '0.00'}</div>
                        </div>
                        {
                            checkout.items.length > 0 ? <button className="text-white bg-yellow-500 hover:bg-black py-2 px-3 w-full font-semibold">PROCEED TO CHECKOUT</button> :
                            <button className="text-white bg-gray-500 py-2 px-3 w-full font-semibold" disabled><s>PROCEED TO CHECKOUT</s></button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    cart: state.cart
})

export default connect(mapStateToProps, { handleCart, getUserCart, checkItem, checkedGroup, removeWarning })(CartItems);
