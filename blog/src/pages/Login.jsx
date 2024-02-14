import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

import '../style.css';
import showPassword from '../images/show-password.svg';
import hidePassword from '../images/hide-password.svg';


function Login() {

    const navigate = useNavigate();


    const url = 'https://apitest.reachstar.io/signin';
    const [Data, setData] = useState({
        email: '',
        password: '',
    });
    
    function submit(e){

        e.preventDefault();

        Axios.post(url, {
            name: 'Usarname',
            email: Data.email,
            password: Data.password,
        })
        .then(res=>{
            console.log("Response data:", res.data);

            setData({

                email: '',
                password: '',
            });

            localStorage.setItem('loginData', JSON.stringify(Data));

            navigate('/home');
        })
        .catch(error => {
            console.error("Error during API request:", error);

            if (error.response) {
                console.error("Server responded with error:", error.response.data);
            } else if (error.request) {
                console.error("No response received from the server");
            } else {
                console.error("Error setting up the request:", error.message);
            }
        });

    }


    const [visible, setVisible] = useState(true);



  return (
    <section className='container-fluid loginSection'>
        <h1>Authorization</h1>

        <form className='loginForm' onSubmit={(e)=> submit(e)}>
                <div>
                    <label htmlFor="email">
                        Email:
                    </label>
                    <input 
                        type="email" 
                        id='email' 
                        name='email' 
                        placeholder='example@example' 
                        value={Data.email}
                        onChange={(e) => setData({...Data, email: e.target.value})}
                    />
                </div>

                <div>
                    <label htmlFor="password">
                        Password:
                    </label>
                    <div className='loginPassword'>
                        <input 
                            value={Data.password}
                            type={visible ? 'password' : 'text'}
                            id="password" 
                            name="password" 
                            onChange={(e) => setData({...Data, password: e.target.value})}
                            placeholder='**********'
                        />

                        <div className='showImage' onClick={() => setVisible((prevVisible) => !prevVisible)}>
                            {      
                                visible ? <img src={showPassword} alt="Hide Password" /> : <img src={hidePassword} alt="Show Password" />
                            }
                        </div>

                    </div>
                </div>

                <div>
                    <input type="submit" value={"Login"} id='registrationSubmit' />
                </div>

                <div className='login'>
                    <p>Don't have an account? : <Link className='link' to="/registration">Create Account</Link>
                    </p>
                </div>
            </form>
    </section>
  )
}

export default Login