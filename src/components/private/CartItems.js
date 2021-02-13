import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spinner } from '../layouts/Spinner';
import { getSingleProduct, handleCart } from '../../redux/actions/product/product.actions';
import { priceFormat } from '../../helpers/common';

function ProductView({ product: { cart_items, loading }, getSingleProduct, handleCart }) {

    return (
        <div className="container mx-auto md:px-20 p-5 pt-32">
           {
               loading ? <div className="my-36 mx-auto "><Spinner/></div> :
                    cart_items.length > 0 ? 
                        <div className="py-10 bg-white md:w-9/12 w-full mx-auto"> 
                            {
                                <>
                                    <h1>hello</h1>
                                  
                                </>
                            }
                        </div>
                    : <h1 className="text-center text-bold text-red-900">YOU HAVE NO ITEMS ADDED TO YOUR CART.</h1>
           }
        </div>
    )
}

const mapStateToProps = state => ({
    product: state.product
})

export default connect(mapStateToProps, { getSingleProduct, handleCart })(ProductView);
