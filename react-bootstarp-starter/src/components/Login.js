import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error } = useSelector((state) => state.auth);
    const { login } = useContext(AuthContext);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const result = await dispatch(loginUser({ email, password }));
      if (result.meta.requestStatus === "fulfilled"){
        const token = result.payload.token;
        const user = JSON.stringify(result.payload.user);
        login(token,user);
        navigate("/dashboard");
      } 
    };

  return (
    <div >
         <div className="container">

<div className="row justify-content-center">

    <div className="col-xl-10 col-lg-12 col-md-9">

        <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
                
                <div className="row">
                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                    <div className="col-lg-6">
                        <div className="p-5">
                            <div className="text-center">
                                <h1 className="h4 text-gray-900 mb-4">Employee Management System</h1>
                            </div>
                            <form className="user" onSubmit={handleSubmit}>
                            {error && <p className="text-danger">{error.message}</p>}
                                <div className="form-group">
                                    <input type="email" className="form-control form-control-user"
                                        id="exampleInputEmail" value={email} onChange={(e) => setEmail(e.target.value)} required
                                        placeholder="Enter Email Address..."/>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control form-control-user"
                                        id="exampleInputPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                </div>
                               
                                <button type='submit' className="btn btn-primary btn-user btn-block">
                                    Login
                                </button>
                                
                            </form>
                            <hr/>
                            <div className="text-center">
                                <a className="small" href="forgot-password.html">Forgot Password?</a>
                            </div>
                            <div className="text-center">
                                <Link className="small" to="/register">Create an Account!</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</div>

</div>

    </div>
  )
}

export default Login;