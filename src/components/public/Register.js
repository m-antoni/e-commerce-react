import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInputChange, authRegister } from '../../redux/actions/auth/auth.action';
import { Spinner } from '../layouts/Spinner';


function Register({ auth: { name, email, password, confirm_password, loading }, handleInputChange, authRegister }) {

    
    return (
        <div className="flex justify-center py-20">
            <div className="shadow rounded-lg sm:w-full sm:m-10 md:w-96 p-10">
                <h3 className="font-bold text-blue-500 pb-2 text-2xl border-b mb-4">Sign Up</h3>
                {
                    loading === 'auth' ? <div className="my-20"><Spinner/></div> : 
                    <>
                        <div className="py-2">
                            <div className=" text-gray-600 mb-2">Name:</div>
                            <input name="name" value={name} onChange={handleInputChange} className="shadow p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded" type="text" placeholder="Enter Name"/>
                        </div>
                        <div className="py-2">
                            <div className=" text-gray-600 mb-2">Email:</div>
                            <input name="email" value={email} onChange={handleInputChange} className="shadow p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded" type="text" placeholder="Enter Email"/>
                        </div>

                        <div className="py-2">
                            <div className="text-gray-600 mb-2">Password:</div>
                            <input name="password" value={password} onChange={handleInputChange} className="shadow p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded" type="password" placeholder="Enter Password"/>
                        </div>

                        <div className="py-2">
                            <div className="text-gray-600 mb-2">Confirm Password:</div>
                            <input name="confirm_password" value={confirm_password} onChange={handleInputChange} className="shadow p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded" type="password" placeholder="Enter Confirm Password"/>
                        </div>

                        <div className="mt-5">
                            <button onClick={authRegister} className="py-2 px-3 text-white bg-blue-500 hover:bg-blue-600 border rounded w-full btn-register">Register</button>
                            <div className="text-md mt-5">Already have an account? <Link to="/login" className="text-blue-500">Login here.</Link></div>
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

export default connect(mapStateToProps, { handleInputChange, authRegister })(Register);
