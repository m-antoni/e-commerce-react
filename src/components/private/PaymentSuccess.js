import React from 'react'
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import { clearTransaction } from '../../redux/actions/transaction.actions';

function PaymentSuccess({ transaction: { payment_status, payment_data: { amount, email, transaction_no } }, clearTransaction }) {
    
    const history = useHistory();

    if(!payment_status){
        return <Redirect to="/home"/>
    }

    const goBack = () => {
        clearTransaction();
        history.push('/home');
    }

    return ( 
        <div className="container mx-auto md:px-20 p-5 pt-32">
            <div className="grid gap-4">                
                <div className="flex justify-center">
                    <div className="py-10 w-auto bg-white rounded mt-5 px-20 shadow-2xl">
                        <div className="flex flex-col">
                            <svg className="w-20 h-20 text-green-500 place-self-center" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                            <h4 className="font-bold text-3xl my-3 text-center text-green-500">Payment Successful</h4>
                        </div>
                        <div className="my-2 text-center">
                            <p className="font-medium text-md text-gray-500">The amount was paid <span className="text-blue-500 font-bold">$ {amount}</span> from {email}</p>
                            <p className="font-medium text-md text-gray-500">Your Transaction No. <span className="text-blue-500 font-bold">{transaction_no}</span></p>
                        </div>
                        <div className="flex">
                            <button onClick={goBack} className="text-white bg-blue-500 hover:bg-blue-600 py-3 px-3 mt-5 w-full font-semibold rounded">RETURN TO HOMEPAGE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    transaction: state.transaction
})

export default connect(mapStateToProps, { clearTransaction })(PaymentSuccess);
