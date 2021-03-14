import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spinner } from '../layouts/Spinner';
import { handleCart } from '../../redux/actions/cart.actions';
import { priceFormat } from '../../helpers/globals';

function Home({ fakestore: { fakestore, loading }, handleCart }) {


    return (
        <div className="container mx-auto md:px-20 p-5 pt-32">
           {
               loading ? <div className="my-36 mx-auto"><Spinner/></div> :
                    fakestore.length > 0 ? 
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 pb-20"> 
                            {
                                fakestore.map(item => (
                                    <div className="p-5 bg-white col-auto cursor-pointer border-2 hover:border-gray-500 border-white">
                                        <Link to={`/home/products/${item._id}`}>
                                            <img className="object-contain h-48 w-full" src={item.image} alt=""/>
                                            <div className="flex justify-between mt-10">
                                                <span className="text-lg">{item.title.slice(0, 21) + (item.title.length > 21 ? "..." : "")}</span>
                                                <span className="text-3xl text-yellow-900 font-bold">&#36; {priceFormat(item.price)}</span>
                                            </div>
                                        </Link>
                                      
                                        <div className="flex mt-10">
                                            <button className="text-white bg-red-900 hover:bg-black mr-3 w-full text-center py-2 px-3">Buy Now</button>
                                            <button onClick={() => handleCart('add', item)}className="text-white bg-yellow-500 hover:bg-black w-full text-center py-2 px-3">Add to Cart</button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    : <h1 className="my-5 text-center">NO PRODUCTS TO DISPLAYS...</h1>
           }
        </div>
    )
}

const mapStateToProps = state => ({
    fakestore: state.fakestore
})

export default connect(mapStateToProps, { handleCart })(Home);
