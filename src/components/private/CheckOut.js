import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spinner } from '../layouts/Spinner';
import { getUserCart, handleCart, checkItem, removeWarning } from '../../redux/actions/cart.actions';
import { priceFormat } from '../../helpers/globals';
import { useHistory } from 'react-router-dom';
import { getShipping, setModal } from '../../redux/actions/shipping.actions';
import ShippingModal from './Shipping.modal';

function CheckOut({ cart: { cart_items, checkout }, shipping: { default_shipping, shipping, shipping_modal }, getUserCart, getShipping, setModal }) {

    const history = useHistory();

    useEffect(() => {
        // getUserCart();
        getShipping();
    }, [])

    // document.removeEventListener('click', setModal(false));

    return (
        <div className="container mx-auto md:px-20 p-5 pt-32">
            <div className="grid grid-flow-col gap-x-8">
                <div className="col-span-8">
                    {
                        cart_items.length > 0  ? 
                            cart_items.map(item => (
                                <div className="py-5 bg-white w-full mx-auto mb-5"> 
                                    <div className="flex md:flex-row flex-col px-10 bg-white justify-between">
                                        <img className="w-10 self-center" src={item.image}/>
                                        <div className="w-1/2 flex flex-col self-center">
                                            <h4 className="font-bold text-lg">{item.title}</h4>
                                        </div>
                                        <div className="flex self-center">
                                            <p className="font-bold text-lg text-yellow-900"><span className="font-medium text-sm text-gray-500">Price: </span>&#36; {priceFormat(item.price)}</p>
                                        </div>
                                        <div className="flex self-center h-auto">
                                            <div className="font-medium text-sm text-gray-500">{item.qty} pc(s)</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        : <h1>NO PRODUCTS TO DISPLAYS...</h1>
                    }
                </div>
                
                <div className="col-span-4">
                    <div className="bg-white py-5 px-3 w-full">
                        {
                            default_shipping !== null ? 
                            <>
                                <div className="flex justify-between mb-2">
                                    <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>
                                    {/* <div className="cursor-pointer hover:text-yellow-900 hover:underline font-semibold">{default_shipping.address}</div> */}
                                </div>
                                <div className="flex justify-between">
                                    <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                                    {/* <div className="cursor-pointer hover:text-yellow-900 hover:underline font-semibold">{default_shipping.contact}</div> */}
                                </div>
                            </>
                            :
                            <div onClick={() => setModal(true)} className="font-medium text-lg text-gray-500 hover:text-yellow-900 text-underline flex cursor-pointer align-middle">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                ADD SHIPPING DETAILS
                            </div>
                        }
                        <div className="border-2 text-yellow-900 my-3"></div>

                        <h1 className="mb-2 font-bold">Order Summary</h1>
                        <div className="flex justify-between mb-1">
                            <div className="font-medium text-sm text-gray-500">Subtotal ({ checkout ? checkout.items.length : 0} Items)</div>
                            <div className="font-bold text-yellow-900">$ { checkout ? priceFormat(checkout.subtotal) : '0.00'}</div>
                        </div>
                        <div className="flex justify-between mb-5">
                            <div className="font-medium text-sm text-gray-500">Shipping Fee</div>
                            <div className="font-bold text-yellow-900">$ 5.00</div>
                        </div>

                        <div className="border-2 text-yellow-900 my-2"></div>

                        <div className="flex justify-between mb-10">
                            <div className="font-medium text-sm">Grand Total</div>
                            <div className="font-bold text-yellow-900">$ { checkout ? priceFormat(checkout.total) : '0.00'}</div>
                        </div>

                        {
                            default_shipping !== null ? <button className="text-white bg-yellow-500 hover:bg-black py-2 px-3 w-full font-semibold align-text-toptext-center">PLACE ORDER</button> :
                            <button className="text-white bg-gray-500 py-2 px-3 w-full font-semibold" disabled><s>PLACE ORDER</s></button>
                        }
                        <button onClick={() => history.goBack()} className="text-white bg-red-500 hover:bg-red-900 py-2 px-3 w-full font-semibold text-center mt-2">CANCEL</button>
                    </div>
                </div>
            </div>
            {
                shipping_modal && <ShippingModal/>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    cart: state.cart,
    shipping: state.shipping
})

export default connect(mapStateToProps, { getUserCart, getShipping, setModal })(CheckOut);
