import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Paypal from './Paypal';

function Checkout({ payment_status }) {

    const history = useHistory();

    return (
        <div className="container mx-auto md:px-20 p-5 pt-32">
            <div className="grid gap-4">                
                <div className="flex justify-center">
                    <div className="py-10 px-10 w-1/2 bg-white rounded shadow-2xl">
                        <div className="flex flex-col">
                            <h4 className="font-bold text-xl mb-3 text-center text-gray-500">CHOOSE YOUR PAYMENT METHOD</h4>
                        </div>
                        <button onClick={() => history.push('/home/checkout/cash-on-delivery')} className="flex justify-center text-white bg-blue-500 hover:bg-blue-600 py-4 px-3 my-3 w-full font-semibold align-text-top text-center rounded">
                            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" /></svg>
                            CASH ON DELIVERY
                        </button>

                        <Paypal/>
                        
                        <button onClick={() => history.push('/home/cart')} className="text-white bg-red-500 hover:bg-red-900 py-3 px-3 w-full font-semibold text-center mt-4 rounded">CANCEL</button>
                    </div> 
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    payment_status: state.transaction
})

export default connect(mapStateToProps, { })(Checkout);