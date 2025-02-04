import React,{useState} from 'react'
import './register.css'
import { MdEmail } from "react-icons/md";
import { FaUser,FaPhone,FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { registerUserApi } from '../../apis/Api';
import { toast } from 'react-toastify'

const Register = () => {

  const[fullname,setFullname] = useState('')
  const[phonenumber,setPhonenumber] = useState('')
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const[confirmPassword,setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);

  const[fullnameerror,setFullnameError] = useState('')
  const[phonenumbererror,setPhonenumberError] = useState('')
  const[emailerror,setEmailError] = useState('')
  const[passwordError,setPasswordError] = useState('')
  const[confirmpassworderror,setConfirmPasswordError] = useState('')
  const [strength, setStrength] = useState('');
  const checkPasswordStrength = (password) => {
    let score = 0;
    // Add rules for password strength
    if (password.length >= 8) score++; // Minimum length
    if (password.length >= 12) score++; // Better length
    if (/[A-Z]/.test(password)) score++; // Uppercase
    if (/[a-z]/.test(password)) score++; // Lowercase
    if (/[0-9]/.test(password)) score++; // Numbers
    if (/[@$!%*?&]/.test(password)) score++; // Special characters

    // Determine strength based on score
    if (score <= 2) return 'Weak';
    if (score <= 4) return 'Medium';
    return 'Strong';
  };
  const handleFullname = (e) => {
    setFullname(e.target.value)
  }
  const handlePhonenumber = (e) => {
    setPhonenumber(e.target.value)
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setStrength(checkPasswordStrength(e.target.value));
  }
  const handleConfPassword =(e)=>{
    setConfirmPassword(e.target.value)
  }
  var validate =() =>{
    var isValid = true;
    if(fullname.trim()===''){
      setFullnameError('Please exter firstname')
      isValid = false;
    }
    if(phonenumber.trim()===''){
      setPhonenumberError('Please exter lastname')
      isValid = false;
    }
    if(email.trim()===''){
      setEmailError('Please exter email')
      isValid = false;
    }
    if(password.trim()===''){
      setPasswordError('Please exter password')
      isValid = false;
    }
    if(confirmPassword.trim()===''){
      setConfirmPasswordError('Please Confirm password')
      isValid = false;
    }
    if(password!== confirmPassword){
      setConfirmPasswordError("Password does not match")
      isValid = false;
    }
    return isValid;
  }
  
  const handleButton =(e)=>{
    e.preventDefault()
    var isValid = validate()
    if(!isValid){
      return; 
    }
    //Making Api request
    //Making JSON object of register data
    const data ={
      "fullname" : fullname,
      "phonenumber" : phonenumber,
      "email" : email,
      "password" : password,
      "confirmPassword":confirmPassword
    }
    registerUserApi(data).then((res) => {
        if(res.data.success === false){
          toast.error(res.data.message);
        }else{
          toast.success(res.data.message);
        }
      }).catch((err) => {
        if (err.response) {
          // Check for 400 Bad Request
          if (err.response.status === 400) {
            toast.error("Invalid data format");
          } else {
            // Handle other error statuses
            toast.error(err.response.data.message || "An unexpected error occurred");
          }
        } else {
          // Handle network or unknown errors
          toast.error("Network error. Please try again later.");
        }
        console.error("Error:", err);
      });
    }


  return (
    <>
    <div className='register-body'>
    <div className = 'wrapper register'>
        <div className = "form-box register">
            <form action = "">
                <h1>Sign Up</h1>
                <div className = "input-box">
                    <input onChange={handleFullname} type = "text"
                    placeholder='Full Name' required />
                    <FaUser className='icon' />
                    {
                      fullnameerror && <small>{fullnameerror}</small>
                    }
                </div>
                <div className = "input-box">
                    <input onChange={handlePhonenumber} type = "text"
                    placeholder='Phone Number' required />
                    <FaPhone className='icon' />
                    {
                      phonenumbererror && <small>{phonenumbererror}</small>
                    }
                </div>
                <div className = "input-box">
                    <input onChange={handleEmail} type = "email"
                    placeholder='Email' required />
                    <MdEmail className='icon' />
                    {
                      emailerror && <small>{emailerror}</small>
                    }
                </div>
                <div className="input-box">
      <input 
        onChange={handlePassword}
        type={showPassword ? 'text' : 'password'}
        placeholder='Password'
        required 
      />
      <div
        onClick={() => setShowPassword(!showPassword)}
        style={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
          fontSize: '16px',
          color: '#5C4033'
        }}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </div>
      {passwordError && <small>{passwordError}</small>}
      <p style={{ 
        color: strength === 'Strong' ? 'green' : 
               strength === 'Medium' ? 'orange' : 
               'red' 
      }}>
        Strength: {strength || 'Enter a password'}
      </p>
    </div>
                <div className = "input-box">
                    <input onChange={handleConfPassword} type = "password"
                    placeholder='Confirm Passwprd' required />
                    <FaLock className='icon'/>
                    {
                      confirmpassworderror && <small>{confirmpassworderror}</small>
                    }
                </div>
                <button onClick ={handleButton} type = "submit">Sign Up</button>
                <div className = "register-link">
                    <p>Already have an account? 
                        <a href = "/">
                            Login
                        </a>
                        </p>
                </div>
            </form>
        </div>
    </div>
    </div>
    </>
  );
}

export default Register
