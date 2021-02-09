import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInputChange, authLogin } from '../../redux/actions/auth/auth.action';
import { Spinner } from '../layouts/Spinner';

function Login({ auth: { email, password, loading }, handleInputChange, authLogin }) {

    return (
        <div className="flex justify-center pt-40">
            <div className="shadow rounded-lg sm:w-full sm:m-10 md:w-96 p-10">
                <h3 className="font-bold text-blue-500 pb-2 text-2xl border-b mb-4">Sing In</h3>
                {
                    loading === 'auth' ? <div className="my-20"><Spinner/></div> : 
                    <>
                        <div className="py-2">
                            <div className="text-gray-600 mb-2">Email:</div>
                            <input name="email" value={email} onChange={handleInputChange} className="shadow p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded" type="email" placeholder="Enter Email"/>
                        </div>
                        <div className="py-2">
                            <div className="text-gray-600 mb-2">Password:</div>
                            <input name="password" value={password} onChange={handleInputChange} className="shadow p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded" type="password" placeholder="Enter Password"/>
                        </div>
                        <div className="mt-5">
                            <button onClick={authLogin} className=" text-white bg-blue-500 hover:bg-blue-600 border py-2 px-3 w-full rounded">Login </button>
                            <div className="text-md text-gray-600 mt-5">Create an account <Link to="/register" className="text-blue-500">here.</Link></div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { handleInputChange, authLogin })(Login);
