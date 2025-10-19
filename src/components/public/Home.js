import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spinner } from '../layouts/Spinner';
import { handleCart } from '../../redux/actions/cart.actions';
import { priceFormat } from '../../helpers/globals';
import { filterBy, setFakeStoreAPI } from '../../redux/actions/fakestore.actions';

function Home({ fakestore: { fakestore, loading }, handleCart, isAuthenticated, filterBy, setFakeStoreAPI }) {

    const history = useHistory();
    
    useEffect(() => {
        setFakeStoreAPI();
    },[]);

    const handleButton = (type, item) => {
        if(isAuthenticated){
            switch (type) {
                case 'buy-now':
                    handleCart('buy', item);
                    history.push('/home/checkout');
                    break;
                case 'add-cart':
                    handleCart('add', item);
                    break;
                default:
                    break;
            }
        }else{
            history.push('/login');
        }
    }

    return (
        <div className="container mx-auto md:px-20 p-5 pt-28">
            
            {
                fakestore.length > 0 && 
                <div className="flex flex-wrap mb-10">
                    <div className="text-gray-500 font-bold my-2">Categories:</div>
                    <div onClick={() => filterBy('men clothing')}className="bg-red-500 py-1 px-2 rounded text-sm text-white font-bold ml-2 cursor-pointer hover:bg-red-600 my-2">MENS CLOTHING</div>
                    <div onClick={() => filterBy('women clothing')}className="bg-red-500 py-1 px-2 rounded text-sm text-white font-bold ml-2 cursor-pointer hover:bg-red-600 my-2">WOMENS CLOTHING</div>
                    <div onClick={() => filterBy('jewelery')}className="bg-red-500 py-1 px-2 rounded text-sm text-white font-bold ml-2 cursor-pointer hover:bg-red-600 my-2">JEWELERY</div>
                    <div onClick={() => filterBy('electronics')}className="bg-red-500 py-1 px-2 rounded text-sm text-white font-bold ml-2 cursor-pointer hover:bg-red-600 my-2">ELECTRONICS</div>
                    <div onClick={() => filterBy()}className="bg-red-500 py-1 px-2 rounded text-sm text-white font-bold ml-2 cursor-pointer hover:bg-red-600 my-2">ALL</div>
                </div>
            }

            {
                loading ? (
                    <div className="my-36 mx-auto">
                    <Spinner />
                    </div>
                ) : fakestore.length > 0 ? (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 pb-20">
                    {fakestore.map((item, index) => (
                        <div
                        key={index}
                        className="p-5 bg-white col-auto cursor-pointer hover:shadow-2xl rounded"
                        >
                        <Link
                            to={
                            !isAuthenticated
                                ? `/home/product-public/${item._id}`
                                : `/home/product-private/${item._id}`
                            }
                        >
                            {/* ✅ Fixed Image Wrapper */}
                            <div className="aspect-square w-full overflow-hidden bg-gray-100 rounded-lg">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover"
                            />
                            </div>

                            {/* ✅ Title & Price */}
                            <div className="flex justify-between mt-6">
                            <span className="text-lg text-gray-700">
                                {item.title}
                            </span>
                            <span className="font-bold text-xl text-red-500">
                                &#36;{priceFormat(item.price)}
                            </span>
                            </div>
                        </Link>

                        {/* ✅ Buttons */}
                        <div className="flex justify-center mt-6 gap-3">
                            <button
                            onClick={() => handleButton("buy-now", item)}
                            className="text-white bg-red-500 hover:bg-red-600 w-full text-center py-2 px-3 rounded"
                            >
                            Buy Now
                            </button>
                            <button
                            onClick={() => handleButton("add-cart", item)}
                            className="text-white bg-yellow-500 hover:bg-yellow-600 w-full text-center py-2 px-3 rounded"
                            >
                            Add to Cart
                            </button>
                        </div>
                        </div>
                    ))}
                    </div>
                ) : (
                    <h1 className="my-5 text-center font-bold text-lg">
                    -- NO PRODUCTS FOUND --
                    </h1>
                )
            }

        </div>
    )
}

const mapStateToProps = state => ({
    fakestore: state.fakestore,
    isAuthenticated: state.auth.user_data.isAuthenticated
})

export default connect(mapStateToProps, { handleCart, filterBy, setFakeStoreAPI })(Home);
