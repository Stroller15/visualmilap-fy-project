import React from 'react'
import './login.css'
import { Link, useNavigate} from 'react-router-dom';
import { useState} from 'react';
import bg from './videos/background.mp4'

export default function Login(props) {
    const [cred, setCreds] = useState({email: "", password: ""});
    let navigate = useNavigate();

    const onChange=(e)=>{
        setCreds({...cred, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e)=>{
      e.preventDefault();
      const url = `http://localhost:4000/api/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email: cred.email, password: cred.password})
      });
      const json= await response.json();
      if(json.success){
          localStorage.setItem('token', json.authToken);
          props.showAlert("Youre logged in","success");
          navigate("/dashboard");
      }
      else{
          props.showAlert("Please Enter Valid Credemtials", "danger")
      }

    }

    const vidstyle={
      position: 'absolute',
      right: 0,
      bottom: 0,
      width: '100vw',
      zIndex: -1,
      opacity: .9
    }
  return (
    <div className='loginPage'>
      <video autoPlay muted loop style={vidstyle}>
            <source src={bg} type="video/mp4"/>
        </video>
      <div className="container">
	    <div className="screen">
		    <div className="screen__content">
			    <form className="login" onSubmit={handleSubmit}>
				    <div className="login__field">
					    <i className="login__icon fas fa-envelope"></i>
					    <input type="email" className="login__input" placeholder="Email" id='email' name='email' onChange={onChange} value={cred.email} required/>
				    </div>
				    <div className="login__field">
					    <i className="login__icon fas fa-lock"></i>
					    <input type="password" className="login__input" placeholder="Password" id='password' name='password' onChange={onChange} value={cred.password} required minLength={5}/>
				    </div>
				    <button type='submit' className='box'>Log In</button>
			    </form>
          <br/><div style={{paddingLeft: '30px', paddingTop: '10px'}}>Not a user? <Link to='/signup'><u>Signup</u></Link></div>
		    </div>
		    <div className="screen__background">
			    <span className="screen__background__shape screen__background__shape3"></span>		
			    <span className="screen__background__shape screen__background__shape2"></span>
			    <span className="screen__background__shape screen__background__shape1"></span>
		    </div>		
	      </div>
        </div>
    </div>
  )
}
