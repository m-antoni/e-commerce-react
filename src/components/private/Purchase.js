import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { priceFormat } from '../../helpers/globals';
import { getTransaction } from '../../redux/actions/transaction.actions';
import moment from 'moment';

function Purchase({ transaction: { transactions }, getTransaction }) {

    useEffect(() => {
        getTransaction();
    }, [])

    return (
        <div className="container pt-28 md:px-20 mx-auto">
            <div className="grid grid-cols-3 gap-4 mt-7">
                <div className="col-span-4">
                    {
                        transactions.length > 0  ? 
                            transactions.map((item, i) => (
                                <div className="mx-auto mb-5"> 
                                   <div className="flex justify-center">
                                        <div className="w-1/2 flex md:flex-row flex-col p-5 bg-white justify-between cursor-pointer hover:shadow-2xl rounded">
                                            <div className="flex flex-col self-center text-sm">
                                                <div className="text-red-500 font-bold mb-2">{item.transaction_code}</div>
                                                <div className="text-gray-500 font-medium mb-2">Payment type: {item.payment_type.toUpperCase()}</div>
                                                <div className="text-gray-500 font-medium mb-2">Total Items: {item.items.length}</div>
                                                <div className="text-gray-500 font-medium">Total: <span className="font-bold"> $ {priceFormat(item.amount)}</span></div>
                                            </div>
                                            <div className="flex flex-col text-sm">
                                                <div className="text-gray-500 font-medium">{moment(item.created_at).format('MM/DD/YYYY')}</div>
                                                <div className="text-gray-500 font-medium text-right">{moment(item.created_at).format('hh:mm A')}</div>
                                            </div>
                                        </div>
                                   </div>
                                </div>
                            ))
                        : <h1>NO PURCHASE TO DISPLAYS...</h1>
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    transaction: state.transaction
})

export default connect(mapStateToProps, { getTransaction })(Purchase);
