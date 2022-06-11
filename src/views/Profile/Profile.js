import React from 'react';
import { useState, useEffect } from 'react';
import useAuth from '../../auth/useAuth';
import YourSalesTable from '../../components/YourSalesTable/YourSalesTable';
import Modal from '@mui/material/Modal';

const Profile = () => {
    const auth = useAuth();
    const userId = { "id" : auth.userId };
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch("/users/getoneuser", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userId)
        })
        .then(res => res.json())
        .then(data => {
            setUser(data[0]);
            setLoading(false);
        })
        .catch(err => console.log(err));
    }, []);
    
    
    
    //LOGOUT
    const handleLogOut = (e) => {
        e.preventDefault();
        fetch("/session/logout", {
            method: 'POST',
            headers: {
                "content-type" : "application/json",
                "Authorization" : `Bearer ${auth.token.token}`
            }
        })
        .then( () => { 
            auth.logout();
            console.log(auth)
            window.location.reload();                
        })
    }



    //MODAL-EDIT-PRODUCT:
    const [modalEU, setModalEU] = useState(false);
    const openModalEU = (e) => {
        e.preventDefault();
        setModalEU(true);
    }
    const closeModalEU = (e) => {
        e.preventDefault();
        setModalEU(false);
    }
    const handleEdit = (e) => {
        e.preventDefault();
        const token_provisorio = auth.token.token;
        const edited_user = {
            id : user._id,
            name : e.target.name.value,
            surname : e.target.surname.value,
            mail : e.target.mail.value,
            password : e.target.password.value
        }
        fetch("/session/logout", {
            method: 'POST',
            headers: {
                "content-type" : "application/json",
                "Authorization" : `Bearer ${token_provisorio}`
            }
        })
        .then( () => { 
            fetch("/users", {
                method: 'PUT',
                headers: {
                    "content-type" : "application/json",
                    "Authorization" : `Bearer ${token_provisorio}`
                },
                body: JSON.stringify(edited_user)
            })
            .then( () => { 
                auth.logout();
                window.location.reload();                
            })               
        })
    }
    const modalEditUser = (
        <div className='modal-box'>
            <h2>Edit User Information</h2>
            <p>You will have to LOGIN again after changing you information.</p>
            <form onSubmit={handleEdit} className="modal-form">
                <input type="text" placeholder="Name" name="name" defaultValue={user.name}/>
                <input type="text" placeholder="Surname" name="surname" defaultValue={user.surname} />
                <input type="text" placeholder="Email" name="mail" defaultValue={user.mail} reqired/>
                <input type="text" placeholder="New Password" name="password" required/>
                <div className="modal-controllers">
                    <button>SAVE</button>
                    <button onClick={closeModalEU} id="cancel">CANCEL</button>
                </div>
            </form>    
        </div>
    )




    //DELETE USER
    const handleDelete = () => {
        const id = { "id" : user._id };
        console.log(id);
        
            fetch("/session/logout", {
                method: 'POST',
                headers: {
                    "content-type" : "application/json",
                    "Authorization" : `Bearer ${auth.token.token}`
                }
            })
            .then( () => { 
                auth.logout();
                fetch("/users",{
                    method:'DELETE',
                    headers:{
                        'content-type': 'application/json',
                        "Authorization" : `Bearer ${auth.token.token}`
                    },
                    body: JSON.stringify(id)
                })
                .then( res =>  res.json() )
                .then( res => {
                    console.log(res);       
                window.location.reload();   
            })
        })
    }

    return (
        <>
            {
                loading
                ?
                <div className="body">
                    <h4>loading...</h4>
                </div>
                :
                <div className='body'>
                    <div className="user-controllers">
                        <h2>Hello {user.name} {user.surname}!</h2>
                        <button className="control-but"onClick={handleLogOut}>Log Out</button>
                        <button className="control-but" onClick={openModalEU}>Edit User</button>
                        <Modal open={modalEU} onClose={openModalEU}>{modalEditUser}</Modal>
                        <button className="control-but del"onClick={handleDelete}>Delete User</button>
                    </div>
                    <div className='your-sales'>
                        <h3>Your Sales:</h3>
                        <YourSalesTable userId={userId.id} />
                    </div>
                </div>
            }
        </>
    )
}

export default Profile;