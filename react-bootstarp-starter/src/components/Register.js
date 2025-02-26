// Register.js
import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/userSlice';
import { useNavigate,Link } from 'react-router-dom'; // Import useNavigate
import { toast } from 'react-toastify';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
    const [repeatPassword, setRepeatPassword] = useState("");

    
      const navigate = useNavigate(); // Initialize useNavigate
      const dispatch = useDispatch();
      const { user,loading, error } = useSelector((state) => state.user);
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== repeatPassword) {
            toast.error("Passwords do not match");
            return;
          }
        dispatch(registerUser(formData)).unwrap();
        toast.success('Registered successfully!'); 
      };

      // Redirect to login page after successful registration
  useEffect(() => {
    if (user) {
      navigate('/login'); // Redirect to the login page
    }
  }, [user, navigate]);

  return (
    <div >
    <div className="container">

        <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
                
                <div className="row">
                    <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                    <div className="col-lg-7">
                        <div className="p-5">
                            <div className="text-center">
                                <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                            </div>
                            <form className="user" onSubmit={handleSubmit}>
                                <div className="form-group row">
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                        <input type="text" className="form-control form-control-user" id="exampleFirstName"
                                            placeholder="First Name"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            />
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control form-control-user" id="exampleLastName"
                                            placeholder="Last Name"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}

                                            />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control form-control-user" id="exampleInputEmail"
                                        placeholder="Email Address"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}

                                        />
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                        <input type="password" className="form-control form-control-user"
                                            id="exampleInputPassword" placeholder="Password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            />
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="password" className="form-control form-control-user"
                                            id="exampleRepeatPassword" placeholder="Repeat Password"
                                            name="retype-password"
                                            value={repeatPassword}
                                            onChange={(e)=>setRepeatPassword(e.target.value)}
                                            />
                                    </div>
                                </div>
                                <button type='submit' className="btn btn-primary btn-user btn-block">
                                    Register Account
                                </button>
                                
                            </form>
                            <hr/>
                            <div className="text-center">
                                <a className="small" href="forgot-password.html">Forgot Password?</a>
                            </div>
                            <div className="text-center">
                                <Link className="small" to="/login">Already have an account? Login!</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    </div>
  );
};

export default Register;