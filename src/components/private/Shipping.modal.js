import React from 'react';
import { connect } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { setModal, removeShippingWarning, shippingForm, handleInput } from '../../redux/actions/shipping.actions';
import ShippingCreate from './Shipping.form';

function ShippingModal({ shipping: { shipping, shipping_form, shipping_modal }, setModal, removeShippingWarning, shippingForm, handleInput }) {

    const closeIcon = (
        <svg className="w-6 h-6 focus:outline-none mb-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    );

    const hasDeFault = (shipping) => {
        let hasDefault = shipping.filter(ship => ship.is_default === true);
        if(hasDefault.length === 0){
            return (
                <div className="font-bold text-sm text-red-500 mb-3 text-right">Warning! You don't have default shipping  please choose one.</div>
            )
        }
    }

    return (
        <Modal open={shipping_modal} onClose={() => setModal(false)} center closeIcon={closeIcon} classNames={{ modal: 'shipping-modal' }}>
            <div className="flex">
                <svg className="w-6 h-6 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"></path></svg>
                <h2 className="font-bold text-lg mb-2 text-yellow-500">Shipping Details</h2>
            </div>
            {
                shipping_form === 'add' || shipping_form === 'edit' ? <ShippingCreate/> :
                shipping.length > 0 ? 
                    <>
                        { hasDeFault(shipping) }
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-500">
                                <tr>
                                    <th scope="col" className="px-3 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">Address</th>
                                    <th scope="col" className="px-3 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">Contact</th>
                                    <th scope="col" className="px-3 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">DEFAULT</th>
                                    <th scope="col" className="px-4 py-3 text-center text-sm font-medium text-white uppercase"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {
                                    shipping.map((ship, index) => (
                                        <tr>
                                            <td className="px-3 py-4" width="50%">
                                                <div className="text-sm font-medium text-gray-500"> {ship.address}</div>
                                            </td>
                                            <td className="px-3 py-4" width="40%">
                                                <div className="text-sm font-medium text-gray-500">{ship.contact}</div>
                                            </td>
                                            <td className="px-10 py-4 text-center text-sm font-medium" width="10%">
                                                <input name="is_default" onChange={e => handleInput(e, ship._id, 'is_default')} type="radio" className="font-medium" checked={ship.is_default}/>
                                            </td>
                                            <td className="px-10 py-4 text-center text-sm font-medium" width="10%">
                                               <div className="flex justify-center">
                                                    <svg onClick={() => shippingForm('edit' , ship)} className="w-6 h-6 cursor-pointer text-gray-500 hover:text-black mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                                                    <svg onClick={() => removeShippingWarning(ship._id)} className="w-6 h-6 cursor-pointer text-gray-500 hover:text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                               </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                                <tr>
                                    <td colspan="4" className="px-10 py-4 text-right text-sm font-medium" width="10%">
                                        <button onClick={() => shippingForm('add')} className="text-white py-3 px-3 bg-yellow-500 hover:bg-yellow-600 font-semibold rounded"> ADD SHIPPING </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </>
                    : 
                    <div className="text-center my-10 px-20">
                        <h4 className="text-gray-500 mb-10 font-bold text-lg">You have no shipping details...</h4>
                        <button onClick={() => shippingForm('add')} className="text-white py-3 px-3 bg-yellow-500 hover:bg-yellow-600 font-semibold rounded"> ADD NEW SHIPPING </button>
                    </div>
            }
        </Modal>
    )
}

const mapStateToProps = state => ({
    shipping: state.shipping
})

export default connect(mapStateToProps, { setModal, removeShippingWarning, shippingForm, handleInput })(ShippingModal)
