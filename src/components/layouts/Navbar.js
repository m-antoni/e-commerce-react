import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { getToken } from '../../helpers/globals';
import { SwalError } from '../../helpers/swal';
import { LogoutAlert } from '../../redux/actions/auth.action';
import { searchFakeStore } from '../../redux/actions/fakestore.actions';
import { useDebounce } from "use-debounce";

function Navbar({ auth: { loading, user_data: { isAuthenticated, user } }, cart, LogoutAlert, searchFakeStore }) {

    const history = useHistory();

    const [dropdown, setDropdown] = useState(false);
    const [search, setSearch] = useState('');
    const [debouncedSearch] = useDebounce(search, 500);
    const [input, setInput] = useState(true);
    
    useEffect(() => {
        setSearch('')
    },[])

    useEffect(() => {
        searchFakeStore(debouncedSearch);
    },[debouncedSearch])

    const handleDropdown = (link) => {
        switch (link) {
            case '/home/purchases':
                history.push(link);
                break;
            case 'logout':
                LogoutAlert();
                break;
            default:
                break;
        }
    }

  
    if(loading === 'verify'){
        return null;
    }

    return (
        <nav className="bg-black py-5 fixed w-full mt-0">
            <div className="container px-5 md:px-20 mx-auto">
                <div className="flex justify-between">
                    <div className="flex cursor-pointer">
                        <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                        <Link to={isAuthenticated ? '/home' : '/'} className="text-white font-bold border-b-2 border-yellow-500 text-lg">eShop</Link>
                    </div>
                    <div className="w-2/4">
                        <form className="hidden md:flex">
                            {
                                input && <input onChange={e => setSearch(e.target.value)} type="text" name="search" placeholder="Search Products here..." className="shadow py-1 px-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded"/>
                            }
                        </form>
                    </div>
                    <ul className="flex items-center">
                        <li className="flex justify-between mr-1 md:mr-2 cursor-pointer"> 
                            <svg className="w-6 h-6 text-yellow-500 md:hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                        <svg className="w-6 h-6 text-yellow-500 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
                            {
                                isAuthenticated ? <Link onClick={cart === 0 ? () => SwalError('You have 0 items, please add at least one.') : () => {}} to={cart === 0 ? () => {} : '/home/cart'} className="rounded-full bg-red-500 flex text-white font-bold items-center justify-center h-7 w-7"><span className="text-sm">{cart}</span></Link> : null
                            }
                        </li>
                        <li className="flex cursor-pointer"> 
                            {
                                getToken() ? 
                                    <div onMouseEnter={() => setDropdown(true)} className="flex">
                                        <span  className="hover:text-white text-yellow-500 mr-1">{user}</span>
                                        <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </div> 
                                    :
                                    <>
                                        <Link to={'/login'} className="px-2 hover:bg-yellow-500 hover:text-white text-yellow-500 rounded border-2 border-yellow-500 mr-2">Login</Link>
                                        <Link to={'/register'} className="px-2 hover:bg-yellow-500 hover:text-white text-yellow-500 rounded border-2 border-yellow-500">Register</Link>
                                    </> 
                            }
                        </li>
                    </ul>
                </div>
                <div onMouseLeave={() => setDropdown(false)} className="flex justify-end">
                    {
                        dropdown && 
                        <ul className="mt-2 pr-5">
                            <li><Link onClick={() => handleDropdown('/home/purchases')} className="hover:text-white text-yellow-500 mb-1">My Purchases</Link></li>
                            <li><Link onClick={() => handleDropdown('logout')} className="hover:text-white text-yellow-500 mb-1">Log-out</Link></li>
                        </ul>
                    }
                </div>
            </div>
        </nav>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    cart: state.cart.cart
})

export default connect(mapStateToProps, { LogoutAlert, searchFakeStore })(Navbar);
