import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux';
import { SwalSuccess } from '../../helpers/swal';
import { priceFormat } from '../../helpers/globals';

function Paypal({ cart: { checkout } }) {
    
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
                SwalSuccess('Payment has been made Successfully.')
                console.log(order);
            },
            onError: err => {
                console.error(err);
            },
        })
        .render(paypalRef.current);
    },[])


    return ( 
        <div ref={paypalRef} />
    )
}


const mapStateToProps = state => ({
    cart: state.cart
})

export default connect(mapStateToProps, { })(Paypal);
