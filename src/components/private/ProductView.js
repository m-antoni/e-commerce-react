import React, { useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spinner } from '../layouts/Spinner';
import { handleCart } from '../../redux/actions/cart.actions';
import { priceFormat } from '../../helpers/globals';
import { getSingleFakeStoreAPI } from '../../redux/actions/fakestore.actions';

function ProductView({ fakestore: { single_fakestore, loading }, handleCart, isAuthenticated, getSingleFakeStoreAPI }) {

    let { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getSingleFakeStoreAPI(id)
    },[])

    
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
        <div className="container mx-auto md:px-20 p-5 pt-32">
           {
               loading ? <div className="my-36 mx-auto "><Spinner/></div> :
                    single_fakestore != null ? 
                        <div className="py-5 bg-white md:w-9/12 w-full mx-auto shadow-2xl"> 
                        <Link to={'/home'} className=" text-white bg-black py-2 px-3 ml-4 mt-5 rounded">GO BACK</Link>
                            {
                                <>
                                    <div className="flex md:flex-row flex-col py-2 px-10">
                                    
                                        <img className="h-full w-96 sm:mb-5" src={single_fakestore.image} alt=""/>
                                        <div className="md:ml-10">
                                            <h4 className="font-bold md:text-2xl text-lg text-gray-500">{single_fakestore.title}</h4>
                                            <p className="text-sm my-5 text-gray-500">{single_fakestore.description}</p>
                                            <p className="font-bold md:text-2xl text-2xl text-red-500 my-5 text-right">&#36;{priceFormat(single_fakestore.price)}</p>

                                            <div className="flex justify-between mt-10">
                                                <button onClick={() => handleButton('buy-now', single_fakestore)} className=" text-white bg-red-500 hover:bg-black py-2 px-3 w-full mr-3 rounded">BUY NOW</button>
                                                <button onClick={() => handleButton('add-cart', single_fakestore)} className=" text-white bg-yellow-500 hover:bg-black py-2 px-3 w-full ml-3 rounded">ADD TO CART</button>
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
    fakestore: state.fakestore,
    isAuthenticated: state.auth.user_data.isAuthenticated
})

export default connect(mapStateToProps, {  handleCart, getSingleFakeStoreAPI })(ProductView);
