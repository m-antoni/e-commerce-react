import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
// import Paypal from './Paypal';
import { priceFormat } from '../../helpers/globals';

function Checkout({ cart: { checkout } }) {

    const history = useHistory();
    const paypalRef = useRef();

    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions) => {
            return actions.order.create({
                purchase_units: [
                    {
                        description: 'E-Shop Online Payment',
                        amount: {
                            currency_code: 'USD',
                            value: priceFormat(checkout.total),
                        },
                    },
                ],
            });
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                console.log(order);
            },
            onError: err => {
                console.error(err);
            },
        })
        .render(paypalRef.current);
    },[])


    return (
        <div className="container mx-auto md:px-20 p-5 pt-32">
            <div className="grid gap-4">                
                <div className="flex justify-center">
                    <div className="py-10 px-20 w-auto bg-white rounded mt-5 shadow-2xl">
                        <div className="flex flex-col">
                            <h4 className="font-bold text-2xl my-3 text-center text-gray-500">Choose Your Payment Method</h4>
                        </div>

                        <button onClick={() => history.push('/home/user/cash-on-delivery')} className="flex justify-center text-white bg-blue-500 hover:bg-blue-600 py-3 px-3 my-3 w-full font-semibold align-text-toptext-center rounded">
                            CASH ON DELIVERY
                        </button>
                        <div ref={paypalRef} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    cart: state.cart
})

export default connect(mapStateToProps, { })(Checkout);