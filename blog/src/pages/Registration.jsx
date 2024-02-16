import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

import '../style.css';
import showPassword from '../images/show-password.svg';
import hidePassword from '../images/hide-password.svg';


function Registration() {

    const navigate = useNavigate();

    const url = 'https://apitest.reachstar.io/signup';
    const [Data, setData] = useState({
        name: '',
        email: '',
        password: '',
    });


    const [showHelperText, setShowHelperText] = useState(false);

    const handleNameChange = (e) => {
        const newName = e.target.value;
        setData((prevData) => ({ ...prevData, name: newName }));

        setShowHelperText(newName.length < 4 || newName.length > 16);
    };


    const [passError, setPassError] = useState(false);
    const passRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setData((prevData) => ({...prevData, password: newPassword}));
      
        setPassError(!passRegex.test(newPassword));
      };

    
    function submit(e){

        e.preventDefault();

        const isNameValid = Data.name.length >= 4 && Data.name.length <= 16;
        const isPasswordValid = passRegex.test(Data.password);

        setShowHelperText(!isNameValid);
        setPassError(!isPasswordValid);

        if (showHelperText || passError) {
            console.log("Error during filling the form");
            return;
          }

        Axios.post(url,{
            name: Data.name,
            email: Data.email,
            password: Data.password,
        })
        .then(res=>{
            console.log("Response data:", res.data);

            setData({
                name: '',
                email: '',
                password: '',
            });

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

        localStorage.setItem('registrationData', JSON.stringify(Data));

    }



    const [visible, setVisible] = useState(true);

    
    return (
        <section className='registrationSection container-fluid'>
            <h1 className='col-12'>Registration</h1>

            <form className='registrationForm' onSubmit={(e)=> submit(e)}>
                    
                <div>
                    <label htmlFor="name">
                        Name:
                    </label>
                    <input 
                        type="text" 
                        id='name' 
                        name='name' 
                        placeholder='name'
                        value={Data.name}
                        onChange={handleNameChange}
                    />
                    {showHelperText && <span className="helperText">4 to 16 characters!</span>}
                </div>

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
                    <div className='RegisterPassword'>
                        <input 
                            value={Data.password}
                            type={visible ? 'password' : 'text'}
                            id="password" 
                            name="password" 
                            onChange={handlePasswordChange}
                            placeholder='**********'
                        />

                        <div className='showImage' onClick={() => setVisible((prevVisible) => !prevVisible)}>
                            {      
                                visible ? <img src={showPassword} alt="Hide Password" /> : <img src={hidePassword} alt="Show Password" />
                            }
                        </div>
                    </div>

                    {passError && <span className='passError'>Atleast 8 characters with 1 uppercase letter and 1 number !</span>}

                </div>

                <div>
                    <input type="submit" id='registrationSubmit' />
                </div>

                <div className='login'>
                    <p>Already have an account? : <Link className='link' to="/login">Log in</Link>
                    </p>
                </div>
            </form>

        </section>
    )
}

export default Registration;