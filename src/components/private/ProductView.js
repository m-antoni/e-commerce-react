import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spinner } from '../layouts/Spinner';
import { handleCart } from '../../redux/actions/cart.actions';
import { priceFormat } from '../../helpers/globals';
import { getSingleFakeStoreAPI } from '../../redux/actions/fakestore.actions';

function ProductView({ fakestore: { single_fakestore, loading }, handleCart, getSingleFakeStoreAPI }) {

    let { id } = useParams();

    useEffect(() => {
        getSingleFakeStoreAPI(id)
    },[])

    console.log(id)
    return (
        <div className="container mx-auto md:px-20 p-5 pt-32">
           {
               loading ? <div className="my-36 mx-auto "><Spinner/></div> :
                    single_fakestore != null ? 
                        <div className="py-10 bg-white md:w-9/12 w-full mx-auto"> 
                            {
                                <>
                                    <div className="flex md:flex-row flex-col py-5 px-10 bg-white">
                                        <img className="h-full w-64 sm:mb-5 mx-auto" src={single_fakestore.image} alt=""/>
                                        <div className="md:ml-24">
                                            <h4 className="font-bold md:text-2xl text-lg">{single_fakestore.title}</h4>
                                            <p className="text-sm my-5">{single_fakestore.description}</p>
                                            <p className="font-bold md:text-3xl text-2xl text-yellow-900 my-5">&#36;  {priceFormat(single_fakestore.price)}</p>

                                            <div className="flex justify-between mt-5">
                                                <button className=" text-white bg-red-900 hover:bg-black py-2 px-3 w-full mr-3">BUY NOW</button>
                                                <button onClick={() => handleCart('add', single_fakestore)} className=" text-white bg-yellow-500 hover:bg-black py-2 px-3 w-full ml-3">ADD TO CART</button>
                                            </div>
                                        </div>
                                    </div>
                                  
                                </>
                            }
                        </div>
                    : <h1>NO PRODUCTS TO DISPLAYS...</h1>
           }
        </div>
    )
}

const mapStateToProps = state => ({
    fakestore: state.fakestore
})

export default connect(mapStateToProps, {  handleCart, getSingleFakeStoreAPI })(ProductView);
