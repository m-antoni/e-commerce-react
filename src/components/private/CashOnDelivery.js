import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spinner } from '../layouts/Spinner';
import { getUserCart, handleCart, checkItem, removeWarning } from '../../redux/actions/cart.actions';
import { priceFormat } from '../../helpers/globals';
import { useHistory } from 'react-router-dom';
import { getShipping, setModal } from '../../redux/actions/shipping.actions';
import ShippingModal from './Shipping.modal';
import { transaction } from '../../redux/actions/transaction.actions';

function CashOnDelivery({ cart: { checkout }, shipping: { default_shipping, shipping_modal }, getShipping, setModal, transaction }) {

    const history = useHistory();

    useEffect(() => {
        getShipping();
    }, [])

    const placeOrder = async ()  => {
        await transaction(null, 'cod');
        history.push('/home/checkout/payment-sucess');
    }

    return (
        <div className="container mx-auto md:px-10 p-5 pt-32">
            { shipping_modal && <ShippingModal/> }
            <div className="grid gap-4">                
                <div className="flex justify-center">
                    <div className="py-10 px-10 w-1/2 bg-white rounded mt-5 shadow-2xl">
                        <div className="flex flex-col">
                            {
                                default_shipping !== null && 
                                <>
                                    <div className="flex justify-between mb-2">
                                        <div className="font-bold text-lg text-yellow-500">Shipping Details</div>
                                        <svg onClick={() => setModal(true)} className="w-6 h-6 text-gray-500 cursor-pointer mb-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <svg className="w-6 h-6 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"></path></svg>
                                        <div className="font-semibold">
                                            {default_shipping.address.slice(0, 25) + (default_shipping.address.length > 25 ? "..." : "...")}
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <svg className="w-6 h-6 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                                        <div className="font-semibold">{default_shipping.contact}</div>
                                    </div>
                                    <div className="border-2 text-yellow-900 my-3"></div>
                                </>
                            }

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
                                default_shipping !== null ? 
                                <button onClick={placeOrder} className="text-white bg-blue-500 hover:bg-blue-600 py-3 px-3 w-full font-semibold align-text-toptext-center rounded">PLACE ORDER</button>
                                :
                                <>
                                    <div className="font-bold text-sm text-red-500 mb-3 text-center">You dont have shipping details <span onClick={() => setModal(true)} className="text-blue-500 hover:text-blue-500 cursor-pointer">Add Here.</span></div>
                                    <button className="text-white bg-gray-500 py-3 px-3 w-full font-semibold mb-2 rounded" disabled><s>PLACE ORDER</s></button>
                                </>
                            }
                            <button onClick={() => history.push('/home/cart')} className="text-white bg-red-500 hover:bg-red-900 py-3 px-3 w-full font-semibold text-center mt-2 rounded">CANCEL</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    cart: state.cart,
    shipping: state.shipping
})

export default connect(mapStateToProps, { getUserCart, getShipping, setModal, transaction })(CashOnDelivery);
