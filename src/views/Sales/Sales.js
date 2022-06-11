//IMPORTS
import React from 'react'
import { useState, useEffect } from 'react';
import useAuth from '../../auth/useAuth';
//TABLE
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
//MODAL
import Modal from '@mui/material/Modal';

const Sales = () => {
    //SALES COMPONENT:
    const auth = useAuth();
    const [products, setProducts] = useState({});
    const [users, setUsers] = useState({});
    const [sales, setSales] = useState({});
    const [loading, setLoading] = useState(true);    
    useEffect(() => {
        fetch("/sales", {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                "Authorization" : `Bearer ${auth.token.token}`
            },
        })
        .then(res => res.json())
        .then(data => {
            setSales(data);
            fetch(`/products`,{
                method:'GET',
                headers:{
                    'content-type': 'application/json',
                    "Authorization" : `Bearer ${auth.token.token}`
                }
            })
            .then( res => res.json() )
            .then( res => {
                setProducts(res);
                fetch(`/users`,{
                        method:'GET'
                    })
                .then( res => res.json() )
                .then( res => {
                    setUsers(res);
                    setLoading(false);
                })
            })
        })
    },[]);


    //MODAL-CREATE-SALE
    const [modalCS, setModalCS] = useState(false);
    const openCloseModalCS = (e) => {
        e.preventDefault();
        setModalCS(!modalCS);
    }
    const handleCreate = (e) => {
        e.preventDefault();
        const new_sale = {
            productId : e.target.productId.value,
            amount : parseInt(e.target.amount.value)
        }
        console.log(new_sale);
        fetch("/sales", {
            method: 'POST',
            headers: {
                "content-type" : "application/json",
                "Authorization" : `Bearer ${auth.token.token}`
            },
            body: JSON.stringify(new_sale)
        })
        .then( () => { 
            window.location.reload();                
        })
    }
    const modalCreateSale = (
        <div className='modal-box'>
            <h2>Create New Sale</h2>
            <form onSubmit={handleCreate} className="modal-form">
                <input type="text" placeholder="Product ID" name="productId" />
                <input type="text" placeholder="Amount" name="amount" />
                <div className="modal-controllers">
                    <button>SAVE</button>
                    <button onClick={openCloseModalCS}>CANCEL</button>
                </div>
            </form>    
        </div>
    )


    //MODAL-EDIT-SALE:
    const [modalES, setModalES] = useState(false);
    const [saleId, setSaleId] = useState();
    const [saleInfo, setSaleInfo] = useState({
        productId : null,
        amount : null,
    });
    const getSaleInfo = (id) => {
        const filteredSale = Object.values(sales).filter( sale => sale._id === id );
        setSaleInfo(filteredSale[0])
    }
    const openModalES = (e) => {
        e.preventDefault();
        setModalES(true);
        setSaleId(e.target.id);
        getSaleInfo(e.target.id);
    }
    const closeModalES = (e) => {
        e.preventDefault();
        setModalES(false);
    }
    const handleEdit = (e) => {
        e.preventDefault();
        const edited_sale = {
            id : saleId,
            userId: auth.userId,
            productId : e.target.productId.value,
            amount : parseInt(e.target.amount.value)
        }
        console.log(edited_sale)
        fetch("/sales", {
            method: 'PUT',
            headers: {
                "content-type" : "application/json",
                "Authorization" : `Bearer ${auth.token.token}`
            },
            body: JSON.stringify(edited_sale)
        })
        .then( () => { 
            window.location.reload();                
        })
    }
    const modalEditSale = (
        <div className='modal-box'>
            <h2>Edit Product</h2>
            <form onSubmit={handleEdit} className="modal-form">
                <input type="text" placeholder="ProductId" name="productId" defaultValue={saleInfo.productId}/>
                <input type="text" placeholder="Amount" name="amount" defaultValue={saleInfo.amount} />
                <div className="modal-controllers">
                    <button>SAVE</button>
                    <button onClick={closeModalES} id="cancel">CANCEL</button>
                </div>
            </form>    
        </div>
    )


    //HANDLE DELETE:
    const handleDelete = (e) => {
        const id = { "id" : e.target.id };
        fetch("/sales",{
            method:'DELETE',
            headers:{
                'content-type': 'application/json',
                "Authorization" : `Bearer ${auth.token.token}`
            },
            body: JSON.stringify(id)
        })
        .then( res => res.json() )
        .then( res => {
            console.log(res);
            window.location.reload();
        })
    }

    //GET PRODUCTS AND USERS NAMES FOR TABLE:
    const getProductName = (id) => {
        const filteredProduct = Object.values(products).filter( product => product._id === id );
        return filteredProduct[0].name;
    }
    const getUserName = (id) => {
        const filteredUser = users.filter( user => user._id === id );
        return filteredUser[0].name + " " + filteredUser[0].surname;
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
                        <button className="control-but" onClick={openCloseModalCS}>Create New Sale</button>
                        <Modal open={modalCS} onClose={openCloseModalCS}>{modalCreateSale}</Modal>
                    </div>
                    <div className='your-sales'>
                        <TableContainer component={Paper} className="coins-table">
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Sale Id</TableCell>
                                        <TableCell align="center">Employee Name</TableCell>
                                        <TableCell align="center">Product Name</TableCell>
                                        <TableCell align="center">Amount</TableCell>
                                        <TableCell align="center">Price</TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                    sales.map((sale) => (
                                        <TableRow key={sale._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell align="center">{sale._id}</TableCell>
                                            <TableCell align="center">{getUserName(sale.userId)}</TableCell>
                                            <TableCell align="center">{getProductName(sale.productId)}</TableCell>
                                            <TableCell align="center">{sale.amount}</TableCell>
                                            <TableCell align="center">{sale.price}</TableCell>
                                            <TableCell align="center">
                                                <div className="control-box">
                                                    <button className="control-but" id={sale._id} onClick={openModalES}>Edit</button>
                                                    <Modal open={modalES} onClose={openModalES}>{modalEditSale}</Modal>
                                                    <button className="control-but del" id={sale._id} onClick={handleDelete}>Delete</button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                } 
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            }
        </>
    )
}

export default Sales;
