// import React,{useState} from 'react'
// import { FaUser,FaLock } from "react-icons/fa";
// import "./login.css"
// import { loginUserApi } from '../../apis/Api';
// import {toast} from 'react-toastify'
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//     const[email,setEmail] = useState('')
//   const[password,setPassword] = useState('')
//   const [rememberMe, setRememberMe] = useState(false);

//   //error state
//   const [emailError, setEmailError] = useState("")
//   const [passwordError,setPasswordError] = useState("")
//   const navigate = useNavigate();

//   var validation =()=>{
//     let isValid = true;
//     if(email ===''|| email.includes("@" === false)){
//       setEmailError("Email is invalid")
//       isValid = false
//     }
//     if(password.trim() ===''){
//       setPasswordError('Password is empty')
//       isValid = false
//     }
//     return isValid;
//   }
//   const handleLogin = (e) => {
//     e.preventDefault()
//     if(!validation()){
//       return;
//     }
//     console.log(email,password)
//     const data ={
//       "email" : email,
//       "password" : password,
//       "rememberMe": rememberMe,
//     }
//     loginUserApi(data).then((res) => {
//       if(res.data.success === false){
//         toast.error(res.data.message)

//       }else{
//         toast.success(res.data.message)
        

//         if (rememberMe) {
//             localStorage.setItem('token', res.data.token);
//             localStorage.setItem('user', JSON.stringify(res.data.userData));
//           } else {
//             sessionStorage.setItem('token', res.data.token);
//             sessionStorage.setItem('user', JSON.stringify(res.data.userData));
//           }
//         //Received data : success-bool, message=string,token- string, userdata-json)
//         // localStorage.setItem('token',res.data.token)

//         // //convert json object
//         // const convertedData = JSON.stringify(res.data.userData)

//         // localStorage.setItem('user',convertedData)
//         navigate('/dashboard');
//       }
//     })
//   }
  


//   return (
//       <div className = "login-body">
//         <div className = 'wrapper'>
//             <div className = "form-box login">
//                 <form action = "">
//                 <h1>Sign Up</h1>
//                 <div className = "input-box login">
//                     <input onChange={(e)=>setEmail(e.target.value)} type = "email"
//                     placeholder='Email' required />
//                     {
//                             emailError && <p className = 'text-danger'>{emailError}</p>
//                         }
//                     <FaUser className='icon'/>
//                 </div>
//                 <div className = "input-box login">
//                     <input onChange={(e)=>setPassword(e.target.value)} type = "password"
//                     placeholder='Password' required />
//                     {
//                             passwordError && <p className = 'text-danger'>{passwordError}</p>
//                         }
//                     <FaLock className='icon'/>
//                 </div>
//                 <div className = "remember-forgot">
//                     <label>
//                         <input onChange={(e)=>setRememberMe(e.target.value)} type = "checkbox"/>
//                         Remember me
//                     </label>
//                     <a href = "#">Forgot password?</a>
//                 </div>
//                 <button onClick={handleLogin} type = "submit">Login</button>
//                 <div className = "register-link">
//                     <p>Don't have an account?
//                         <a href = "../register">
//                             Register
//                         </a>
//                         </p>
//                 </div>
                
//             </form>
//         </div>
//     </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { FaUser, FaLock,FaTimes } from "react-icons/fa";
import "./login.css";
import { loginUserApi } from '../../apis/Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();

    const validation = () => {
        let isValid = true;
        if (email === '' || email.includes("@") === false) {
            setEmailError("Email is invalid");
            isValid = false;
        }
        if (password.trim() === '') {
            setPasswordError('Password is empty');
            isValid = false;
        }
        return isValid;
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if (!validation()) {
            return;
        }
    
        console.log(email, password);
    
        const data = {
            email: email,
            password: password,
            rememberMe: rememberMe,
        };
    
        loginUserApi(data)
            .then((res) => {
                if (res.data.success === false) {
                    toast.error(res.data.message);
                } else {
                    toast.success(res.data.message);
                    if (rememberMe) {
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('user', JSON.stringify(res.data.userData));
                    } else {
                        sessionStorage.setItem('token', res.data.token);
                        sessionStorage.setItem('user', JSON.stringify(res.data.userData));
                    }
                    if (res.data.userData.isAdmin) {
                        navigate('/admin/home');
                    } else {
                        navigate('/dashboard');
                    }
                }
            })
            .catch((error) => {
                console.log(error.response)
                if (error.response) {
                    if (error.response.status === 401) {
                        // Handle incorrect email or password
                        toast.error('Incorrect email or password. Please try again.');
                    } else {
                        // Handle other server errors
                        toast.error(`Error: ${error.response.data.message || 'Something went wrong'}`);
                    }
                } else {
                    // Handle network or unexpected errors
                    toast.error('Network error. Please try again later.');
                }
                console.error('Login error:', error);
            });
    };
    

    const handleForgotPassword = () => {
        // Here you would typically make an API call to handle the forgot password functionality
        console.log("Forgot password for phone number:", phoneNumber);
        toast.info("Password reset instructions sent to your phone number.");
        setShowForgotPasswordModal(false);
    }

    return (
      <div className="login-body">
          <div className='wrapper'>
              <div className="form-box login">
                  <form action="">
                      <h1 className="text-2xl font-semibold text-brown-800 mb-6">Sign Up</h1>
                      <div className="input-box login relative">
                          <input 
                              onChange={(e) => setEmail(e.target.value)} 
                              type="email"
                              placeholder='Email' 
                              required 
                              className="w-full p-2 pl-10 border border-brown-300 rounded" 
                          />
                          {emailError && <p className='text-red-500 text-sm mt-1'>{emailError}</p>}
                          <FaUser className='absolute left-3 top-1/2 transform -translate-y-1/2 text-brown-500' />
                      </div>
                      <div className="input-box login relative mt-4">
                          <input 
                              onChange={(e) => setPassword(e.target.value)} 
                              type="password"
                              placeholder='Password' 
                              required 
                              className="w-full p-2 pl-10 border border-brown-300 rounded" 
                          />
                          {passwordError && <p className='text-red-500 text-sm mt-1'>{passwordError}</p>}
                          <FaLock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-brown-500' />
                      </div>
                      <div className="remember-forgot flex justify-between items-center mt-4">
                          <label className="flex items-center text-brown-700">
                              <input onChange={(e) => setRememberMe(e.target.checked)} type="checkbox" className="mr-2" />
                              Remember me
                          </label>
                          <a href="/forgot-password" className="text-brown-600 hover:text-brown-800">Forgot password?</a>
                      </div>
                      <button onClick={handleLogin} type="submit" className="w-full bg-brown-600 text-white py-2 rounded mt-6 hover:bg-brown-700 transition duration-300">Login</button>
                      <div className="register-link mt-4 text-center">
                          <p className="text-brown-700">Don't have an account?
                              <a href="../register" className="text-brown-600 hover:text-brown-800 ml-1">
                                  Register
                              </a>
                          </p>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  );
}

export default Login;