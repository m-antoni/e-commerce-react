import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from '../layouts/Spinner';
import { handleInput, addShipping, genForm, shippingForm, updateShipping } from '../../redux/actions/shipping.actions';

function ShippingCreate({ shipping: { forms, loading, shipping_form, edit_form }, handleInput, addShipping, genForm, shippingForm, updateShipping }) {

    if(loading === 'shipping'){
        return ( <div className="my-20 mx-32 text-center"><Spinner/></div> );
    }
    
    if(shipping_form === 'add'){
        return (
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-500">
                    <tr>
                        <th scope="col" className="px-3 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">Address</th>
                        <th scope="col" className="px-3 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">Contact</th>
                        <th scope="col" className="px-4 py-3 text-center text-sm font-medium text-white uppercase">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {
                        forms.map((form, index) => (
                            <tr>
                                <td className="px-3 py-4" width="50%">
                                    <div className="text-sm text-gray-500">
                                        <input name="address" onChange={e => handleInput(e, index, 'add')} value={form.address} className="text-lg shadow p-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-500 rounded" type="text" placeholder="Address"/>
                                    </div>
                                </td>
                                <td className="px-2 py-4" width="40%">
                                    <div className="text-sm text-gray-500">
                                        <input name="contact" onChange={e => handleInput(e, index, 'add')} value={form.contact} className="text-lg shadow p-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-500 rounded" type="text" placeholder="Contact"/>
                                    </div>
                                </td>
                                <td className="px-10 py-4 text-center" width="10%">
                                    {
                                        forms.length === 1 ? <svg onClick={() => genForm()} className="w-6 h-6 cursor-pointer text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path></svg>
                                        : <svg onClick={() => genForm('remove', index)} className="w-6 h-6 cursor-pointer text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
                                    }
                                </td>
                            </tr>
                        ))
                    }
    
                    {
                        forms.length > 1 && 
                        <tr>
                            <td colspan="2"></td>
                            <td className="px-3 py-4">
                                <div className="flex justify-center">
                                    <svg onClick={() => genForm()} className="w-6 h-6 cursor-pointer text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path></svg>
                                </div>
                            </td>
                        </tr>
                    }
    
                    <tr>
                        <td colspan="3" className="px-3 py-4 text-right">
                            <button onClick={() => shippingForm('close')} className="text-white bg-red-500 hover:bg-red-900 py-2 px-6 mr-2 font-semibold text-center mt-2">CANCEL</button>
                            <button onClick={addShipping} className="text-white py-2 px-6 bg-gray-900 hover:bg-gray-800 font-semibold"> SUBMIT </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }



    if(shipping_form === 'edit'){

        return (
            <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-500">
                    <tr>
                        <th scope="col" className="px-3 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">Address</th>
                        <th scope="col" className="px-3 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">Contact</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                        <td className="px-3 py-4" width="400px">
                            <div className="text-sm text-gray-500">
                                <input name="address" onChange={e => handleInput(e, null, 'edit')} value={edit_form.address} className="text-lg shadow p-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-500 rounded" type="text" placeholder="Address"/>
                            </div>
                        </td>
                        <td className="px-2 py-4" width="400px">
                            <div className="text-sm text-gray-500">
                                <input name="contact" onChange={e => handleInput(e, null, 'edit')} value={edit_form.contact} className="text-lg shadow p-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-500 rounded" type="text" placeholder="Contact"/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" className="px-3 py-4 text-right">
                            <button onClick={() => shippingForm('close')} className="text-white bg-red-500 hover:bg-red-900 py-2 px-6 mr-2 font-semibold text-center mt-2">CANCEL</button>
                            <button onClick={updateShipping} className="text-white py-2 px-6 bg-gray-900 hover:bg-gray-800 font-semibold"> UPDATE </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }

}

const mapStateToProps = state => ({
    shipping: state.shipping
})

export default connect(mapStateToProps, { handleInput, addShipping, genForm, shippingForm, updateShipping })(ShippingCreate)
