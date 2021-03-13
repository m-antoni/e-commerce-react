import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Paypal from './Paypal';

function Checkout() {

    const history = useHistory();

    return (
        <div className="container mx-auto md:px-20 p-5 pt-32">
            <div className="grid gap-4">                
                <div className="flex justify-center">
                    <div className="py-10 px-20 w-auto bg-white rounded mt-5 shadow-2xl">
                        <div className="flex flex-col">
                            <h4 className="font-bold text-2xl my-3 text-center text-gray-500">Choose Your Payment Method</h4>
                        </div>
                        <button onClick={() => history.push('/home/checkout/cash-on-delivery')} className="flex justify-center text-white bg-blue-500 hover:bg-blue-600 py-3 px-3 my-3 w-full font-semibold align-text-toptext-center rounded">
                            CASH ON DELIVERY
                        </button>
                        <Paypal/>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    //
})

export default connect(mapStateToProps, { })(Checkout);