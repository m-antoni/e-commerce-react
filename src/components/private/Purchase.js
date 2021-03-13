import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { priceFormat } from '../../helpers/globals';
import { getTransaction } from '../../redux/actions/transaction.actions';

function Purchase({ transaction: { transactions }, getTransaction }) {

    const history = useHistory();

    useEffect(() => {
        getTransaction();
    }, [])

    return (
        <div className="container pt-32 md:px-20 mx-auto">
            <div className="grid grid-cols-6 grid-flow-col gap-x-4">
                <div className="col-span-8">
                    {/* <div className="py-5 bg-white w-full mx-auto mb-5"> 
                        <div className="flex md:flex-row flex-col px-10 bg-white justify-between">
                            <div>
                                <input onChange={checkedGroup} type="checkbox" className="self-center" id="select-all" name="checked_item" checked={checked_group}/> 
                                <label className="text-sm text-gray-500 font-bold pl-5 cursor-pointer hover:text-yellow-900" for="select-all">SELECT ALL ({cart_items.length} Items)</label>
                            </div>
                            {
                                checkout.items.length > 0 && <svg onClick={() => removeWarning()} className="w-6 h-6 text-gray-500 self-center hover:text-red-500 cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                            }
                        </div>
                    </div> */}
                    {
                        transactions.length > 0  ? 
                            transactions.map((item, i) => (
                                <div className="py-5 bg-white w-full mx-auto mb-5"> 
                                    <div className="flex md:flex-row flex-col px-10 bg-white justify-between cursor-pointer">
                                        <div className="w-1/2 flex flex-col self-center text-sm">
                                            <div className="text-blue-500 font-medium mb-2">{item.transaction_code}</div>
                                            <div className="text-gray-500 font-medium mb-2">Payment Type: {item.payment_type.toUpperCase()}</div>
                                            <div className="text-gray-500 font-medium">Total: <span className="font-bold text-yellow-900"> $ {priceFormat(item.amount)}</span></div>
                                        </div>
                                        <div className="flex flex-col self-center text-sm">
                                            <div className="text-gray-500 font-medium mb-2">Items: {item.items.length}</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        : <h1>NO PURCHASE TO DISPLAYS...</h1>
                    }
                </div>
                
                <div className="col-span-4">
                    <div className="bg-white py-5 px-3 w-96">
                        <h1 className="mb-2 font-bold">Purchase Summary</h1>
                        <div className="flex justify-between mb-1">
                            <div className="font-medium text-sm text-gray-500">Paypal (500)</div>
                            <div className="font-bold text-yellow-900">$ 8898.50</div>
                        </div>
                        <div className="flex justify-between mb-5">
                            <div className="font-medium text-sm text-gray-500">COD (10)</div>
                            <div className="font-bold text-yellow-900">$ 100.52</div>
                        </div>

                        <div className="border-2 text-yellow-900 my-2"></div>

                        <div className="flex justify-between">
                            <div className="font-medium text-sm">Grand Total</div>
                            <div className="font-bold text-yellow-900">$ 5,2254.50</div>
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

export default connect(mapStateToProps, { getTransaction })(Purchase);
