import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { priceFormat } from '../../helpers/globals';
import { transaction } from '../../redux/actions/transaction.actions';

function Paypal({ cart: { checkout } }) {
    
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
                // paymentSuccess(order)
                console.log(order);
            },
            onError: err => {
                console.error(err);
            },
        })
        .render(paypalRef.current);
    },[])


    const paymentSuccess = (data)  => {
        transaction(data);
        history.push('/home/user/payment-sucess');
    }
    
    return ( 
        <div ref={paypalRef} />
    )
}


const mapStateToProps = state => ({
    cart: state.cart
})

export default connect(mapStateToProps, { })(Paypal);
