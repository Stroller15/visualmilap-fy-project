import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './login.css'
import bg from './videos/background.mp4'

export default function Signup(props) {
  const [cred, setCreds] = useState({name: "", email: "", password: "", cpassword: ""});
  
  const navigate = useNavigate();
  const onChange=(e)=>{
      setCreds({...cred, [e.target.name]: e.target.value})
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
        const url = `http://localhost:4000/api/auth/createuser`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name: cred.name, email: cred.email, password: cred.password})
        });
        const json= await response.json();
        if(json.success){
          localStorage.setItem('token', json.authtoken);
          props.showAlert("Account created successfully","success");
          navigate("/login");
        }
        else{
          props.showAlert("E-mail exists","danger");
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
	      <div className="screen" style={{height: '550px'}}>
		    <div className="screen__content">
        <form className="login" onSubmit={handleSubmit} style={{paddingTop: '50px'}}>
        <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input type='text' className="login__input" placeholder='Name' id="name" name='name' onChange={onChange} value={cred.name} required/>
            </div>
            <div className="login__field">
                <i className="login__icon fas fa-envelope"></i>
                <input type="email" className="login__input" placeholder='Email' id="email" aria-describedby="emailHelp" name='email' onChange={onChange} value={cred.email} required/>
            </div>
            <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input type="password" className="login__input" placeholder='Password' id="password" name='password' onChange={onChange} value={cred.password} required minLength={5}/>
            </div>
            <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input type="password" className="login__input" placeholder='Confirm Password' id="cpassword" name='cpassword' onChange={onChange} value={cred.cpassword} required minLength={5} style={{width: '80%'}}/>
            </div>
            <button type='submit' className='box'>Sign Up</button>
        </form>
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
