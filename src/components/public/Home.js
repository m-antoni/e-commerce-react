import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spinner } from '../layouts/Spinner';
import { getAllProducts } from '../../redux/actions/product/product.actions';
import { priceFormat } from '../../helpers/common';

function Home({ product: { products, loading }, getAllProducts }) {

    useEffect(() => {
        getAllProducts();
    },[])

    return (
        <div className="container mx-auto md:px-20 p-5 pt-32">
           {
               loading ? <div className="my-36 mx-auto"><Spinner/></div> :
                    products.length > 0 ? 
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 pb-20"> 
                            {
                                products.map(item => (
                                    <div className="p-3 bg-white col-auto cursor-pointer">
                                        <img className="object-contain h-48 w-full" src={item.image} alt=""/>

                                        <div className="flex justify-between mt-10">
                                            <span className="text-lg">{item.title.slice(0, 25) + (item.title.length > 25 ? "..." : "")}</span>
                                            <span className="text-3xl text-yellow-900 font-bold">{priceFormat(item.price)}</span>
                                        </div>
                                        <div className="flex mt-10">
                                            <span className="text-white bg-red-900 py-1 px-2 hover:bg-black mr-3 w-full text-center">Buy Now</span>
                                            <span className="text-white bg-yellow-500 py-1 px-2 hover:bg-black w-full text-center">Add to Cart</span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    : <h1>NO PRODUCTS TO DISPLAYS...</h1>
           }
        </div>
    )
}

const mapStateToProps = state => ({
    product: state.product
})

export default connect(mapStateToProps, { getAllProducts })(Home);
