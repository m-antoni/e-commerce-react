import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInputChange, authLogin } from '../../redux/actions/auth/auth.action';
import { Spinner } from '../layouts/Spinner';

function Login({ auth: { email, password, loading, success }, handleInputChange, authLogin }) {

    if(success){
        return <Redirect to={'/dashboard'}/>
    }

    return (
        <div className="flex justify-center pt-32">
            <div className="shadow sm:w-full sm:m-10 md:w-96 p-10 bg-white">
                <h3 className="font-bold pb-2 text-2xl border-b mb-4">Sing In</h3>
                {
                    loading === 'auth' ? <div className="my-20"><Spinner/></div> : 
                    <>
                        <div className="py-2">
                            <div className="text-gray-900 mb-2">Email:</div>
                            <input name="email" value={email} onChange={handleInputChange} className="shadow p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded" type="email" placeholder="Enter Email"/>
                        </div>
                        <div className="py-2">
                            <div className="text-gray-900 mb-2">Password:</div>
                            <input name="password" value={password} onChange={handleInputChange} className="shadow p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded" type="password" placeholder="Enter Password"/>
                        </div>
                        <div className="mt-5">
                            <button onClick={authLogin} className=" text-white bg-yellow-500 hover:bg-black py-2 px-3 w-full">Login </button>
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
