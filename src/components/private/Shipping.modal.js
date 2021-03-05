import React from 'react';
import { connect } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { Spinner } from '../layouts/Spinner';
import { setModal, handleInput, addShipping, genForm, removeShippingWarning } from '../../redux/actions/shipping.actions';

function ShippingModal({ shipping: { shipping, loading, shipping_modal, forms }, setModal, handleInput, addShipping, genForm, removeShippingWarning }) {

    const closeIcon = (
        <svg className="w-6 h-6 focus:outline-none mb-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    );

    return (
        <div>
        <Modal open={shipping_modal} onClose={() => setModal(false)} center closeIcon={closeIcon} classNames={{ modal: 'shipping-modal' }}>
          <h2 className="font-bold text-lg mb-2 text-yellow-500">Shipping Details</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-500">
                <tr>
                    <th scope="col" className="px-3 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">Address</th>
                    <th scope="col" className="px-3 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">Contact</th>
                    <th scope="col" className="px-3 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">DEFAULT</th>
                    <th scope="col" className="px-4 py-3 text-center text-sm font-medium text-white uppercase">
                        
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {
                    loading === 'shipping' ? <tr><td colspan="3" className="text-center py-2"><Spinner/></td></tr> : 
                    shipping.map(ship => (
                        <tr>
                            <td className="px-3 py-4" width="50%">
                                <div className="text-sm font-medium text-gray-500"> {ship.address}</div>
                            </td>
                            <td className="px-3 py-4" width="40%">
                                <div className="text-sm font-medium text-gray-500">{ship.contact}</div>
                            </td>
                            <td className="px-10 py-4 text-center text-sm font-medium" width="10%">
                                <input type="radio" className="font-medium" checked={ship.is_default ? true : false}/>
                            </td>
                            <td className="px-10 py-4 text-center text-sm font-medium" width="10%">
                                <svg onClick={() => removeShippingWarning(ship._id)} className="w-6 h-6 cursor-pointer text-gray-500 hover:text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
                            </td>
                        </tr>
                    ))
                }
                    <tr>
                        <td className="px-3 py-4 text-center" colspan="4">
                            <div className="flex justify-center"> 
                                <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                <span className="text-lg font-bold text-gray-500 px-3">ADD FORMS HERE </span>
                                <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                            </div>
                        </td>
                    </tr>
                {
                    forms.map((form, index) => (
                        <tr>
                            <td className="px-3 py-4" width="50%">
                                <div className="text-sm text-gray-500">
                                    <input name="address" onChange={e => handleInput(e, index)} value={form.address} className="text-lg shadow p-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-500 rounded" type="text" placeholder="Address"/>
                                </div>
                            </td>
                            <td className="px-2 py-4" width="40%">
                                <div className="text-sm text-gray-500">
                                    <input name="contact" onChange={e => handleInput(e, index)} value={form.contact} className="text-lg shadow p-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-500 rounded" type="text" placeholder="Contact"/>
                                </div>
                            </td>
                            <td className="px-2 py-4" width="40%">
                                <div className="text-sm text-gray-500 text-center">
                                    <input name="is_default" onChange={e => handleInput(e, index)} type="radio" className="font-medium"/>
                                </div>
                            </td>
                            <td className="px-10 py-4 text-center" width="10%">
                                <svg onClick={() => genForm('remove', index)} className="w-6 h-6 cursor-pointer text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
                            </td>
                        </tr>
                    ))
                }
                <tr>
                    <td className="px-3 py-4" width="50%" colspan="3"> </td>
                    <td className="px-10 py-4 text-center" width="10%">
                        <svg onClick={() => genForm()} className="w-6 h-6 cursor-pointer text-blue-500 text-3xl" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path></svg>
                    </td>
                </tr>

                <tr>
                    <td colspan="4" className="px-10 py-4 text-right text-sm font-medium" width="10%">
                        <button onClick={addShipping} className="text-white py-2 px-6 bg-gray-900 hover:bg-gray-800 font-semibold"> SAVE SETTING </button>
                    </td>
                </tr>
                
            </tbody>
            </table>
        </Modal>
      </div>
    )
}

const mapStateToProps = state => ({
    shipping: state.shipping
})

export default connect(mapStateToProps, { setModal, handleInput, addShipping, genForm, removeShippingWarning })(ShippingModal)
