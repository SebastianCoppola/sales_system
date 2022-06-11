import React from 'react'
import useAuth from '../../auth/useAuth'
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';



export default function LoginForm() {
    const auth = useAuth();
    const navigate = useNavigate();

    //LOGIN:
    const handleLogin = (e) => {
        e.preventDefault();
        const user = { mail: e.target.mail.value, password: e.target.password.value };
        fetch("/session/login", {
            method: 'POST',
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            auth.login();
            navigate('/');
            window.location.reload();
        })
    }



    //CREATE USER:
    const [modalCU, setModalCU] = useState(false);
    const openCloseModalCU = (e) => {
        e.preventDefault();
        setModalCU(!modalCU);
    }
    const handleCreate = (e) => {
        e.preventDefault();
        const new_user = {
            name : e.target.name.value,
            surname : e.target.surname.value,
            mail : e.target.mail.value,
            password : e.target.password.value
        }
        console.log(new_user);
        fetch("/users", {
            method: 'POST',
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(new_user)
        })
        .then( () => { 
            window.location.reload();
            alert("Thank you for registering! Now please Login.");
        })
    }
    const modalCreateUser = (
        <div className='modal-box'>
            <h2>Register</h2>
            <form onSubmit={handleCreate} className="modal-form">
                <input type="text" placeholder="Name" name="name" required/>
                <input type="text" placeholder="Surname" name="surname" required/>
                <input type="text" placeholder="Email" name="mail" required/>
                <input type="text" placeholder="Password" name="password" required/>
                <div className="modal-controllers">
                    <button>SAVE</button>
                    <button onClick={openCloseModalCU}>CANCEL</button>
                </div>
            </form>    
        </div>
    )



    return (
        <div className='login-form'>
            <h2>LOGIN</h2>
            <form onSubmit={handleLogin}>
                <input type='text' name='mail' placeholder='Email' className='input'/>
                <input type='text' name='password' placeholder='Password' className='input'/>
                <button className='submit'>Login</button>
            </form>
            <p><i>First time here?</i></p>
            <button className="signup-button" onClick={openCloseModalCU}>Register</button>
            <Modal open={modalCU} onClose={openCloseModalCU}>{modalCreateUser}</Modal>
        </div>
    )
}