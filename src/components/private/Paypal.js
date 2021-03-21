import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { priceFormat } from '../../helpers/globals';
import { transaction } from '../../redux/actions/transaction.actions';

function Paypal({ cart: { checkout }, transaction}) {
    
    const history = useHistory();
    const paypal = useRef();

    useEffect(() => {
        // Note: need to remove comma for passing value
        const price = priceFormat(checkout.total).split(",").join("");

        window.paypal.Buttons({
            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            description: 'E-Shop Online Payment',
                            amount: {
                                currency_code: 'USD',
                                value: price,
                            },
                        },
                    ],
                });
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                paymentSuccess(order)
                console.log(order);
            },
            onError: err => {
                console.error(err);
            },
        })
        .render(paypal.current);

    },[checkout.total])

    const paymentSuccess = async (data) => {
        await transaction(data, 'paypal');
        history.push('/home/checkout/payment-sucess');
    }

    return ( 
       <div>
            <div ref={paypal} />
       </div>
    )
}


const mapStateToProps = state => ({
    cart: state.cart
})

export default connect(mapStateToProps, { transaction })(Paypal);

