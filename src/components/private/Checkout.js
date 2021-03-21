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
                            <h4 className="font-bold text-2xl mb-3 text-center text-gray-500">Choose Your Payment Method</h4>
                        </div>
                        <button onClick={() => history.push('/home/checkout/cash-on-delivery')} className="flex justify-center text-white bg-blue-500 hover:bg-blue-600 py-3 px-3 my-3 w-full font-semibold align-text-toptext-center rounded">
                            CASH ON DELIVERY
                        </button>
                        <Paypal/>
                        
                        <button onClick={() => history.push('/home/cart')} className="text-white bg-red-500 hover:bg-red-900 py-3 px-3 w-full font-semibold text-center mt-2 rounded">CANCEL</button>
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