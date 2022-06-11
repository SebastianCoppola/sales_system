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


const Products = () => {
    //PRODUCT COMPONENT:
    const auth = useAuth();
    const [products, setProducts] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch("/products", {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                "Authorization" : `Bearer ${auth.token.token}`
            },
        })
        .then(res => res.json())
        .then(data => {
            setProducts(data);
            setLoading(false);
        })
        .catch(err => console.log(err));
    }, []);



    //MODAL-CREATE-PRODUCT
    const [modalCP, setModalCP] = useState(false);
    const openCloseModalCP = (e) => {
        e.preventDefault();
        setModalCP(!modalCP);
    }
    const handleCreate = (e) => {
        e.preventDefault();
        const new_product = {
            name : e.target.name.value,
            price : e.target.price.value,
            description : e.target.description.value,
            img : e.target.img.value,
            category : e.target.category.value
        }
        console.log(new_product);
        fetch("/products", {
            method: 'POST',
            headers: {
                "content-type" : "application/json",
                "Authorization" : `Bearer ${auth.token.token}`
            },
            body: JSON.stringify(new_product)
        })
        .then( () => { 
            window.location.reload();                
        })
    }
    const modalCreateProduct = (
        <div className='modal-box'>
            <h2>Create New Product</h2>
            <form onSubmit={handleCreate} className="modal-form">
                <input type="text" placeholder="Name" name="name" />
                <input type="text" placeholder="Description" name="description" />
                <input type="text" placeholder="Category" name="category" />
                <input type="text" placeholder="URL IMG" name="img" />
                <input type="text" placeholder="Price" name="price" />
                <div className="modal-controllers">
                    <button /*onClick={handleCreate}*/>SAVE</button>
                    <button onClick={openCloseModalCP}>CANCEL</button>
                </div>
            </form>    
        </div>
    )
        


    //MODAL-EDIT-PRODUCT:
    const [modalEP, setModalEP] = useState(false);
    const [productId, setProductId] = useState();
    const [productInfo, setProductInfo] = useState({
        name : null,
        price : null,
        description : null,
        img : null,
        category : null
    });
    const getProductInfo = (id) => {
        const filteredProduct = Object.values(products).filter( product => product._id === id );
        setProductInfo(filteredProduct[0])
    }
    const openModalEP = (e) => {
        e.preventDefault();
        setModalEP(true);
        setProductId(e.target.id);
        getProductInfo(e.target.id);
    }
    const closeModalEP = (e) => {
        e.preventDefault();
        setModalEP(false);
    }
    const handleEdit = (e) => {
        e.preventDefault();
        const edited_product = {
            id : productId,
            name : e.target.name.value,
            price : e.target.price.value,
            description : e.target.description.value,
            img : e.target.img.value,
            category : e.target.category.value
        }
        fetch("/products", {
            method: 'PUT',
            headers: {
                "content-type" : "application/json",
                "Authorization" : `Bearer ${auth.token.token}`
            },
            body: JSON.stringify(edited_product)
        })
        .then( () => { 
            window.location.reload();                
        })
    }
    const modalEditProduct = (
        <div className='modal-box'>
            <h2>Edit Product</h2>
            <form onSubmit={handleEdit} className="modal-form">
                <input type="text" placeholder="Name" name="name" defaultValue={productInfo.name}/>
                <input type="text" placeholder="Description" name="description" defaultValue={productInfo.description} />
                <input type="text" placeholder="Category" name="category" defaultValue={productInfo.category}/>
                <input type="text" placeholder="URL IMG" name="img" defaultValue={productInfo.img}/>
                <input type="text" placeholder="Price" name="price" defaultValue={productInfo.price}/>
                <div className="modal-controllers">
                    <button>SAVE</button>
                    <button onClick={closeModalEP} id="cancel">CANCEL</button>
                </div>
            </form>    
        </div>
    )



    //HANDLE DELETE:
    const handleDelete = (e) => {
        const id = { "id" : e.target.id };
        fetch("/products",{
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
                        <button className="control-but" onClick={openCloseModalCP}>Create New Product</button>
                        <Modal open={modalCP} onClose={openCloseModalCP}>{modalCreateProduct}</Modal>
                    </div>
                    <div className='your-sales'>
                        <TableContainer component={Paper} className="coins-table">
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Id</TableCell>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">Description</TableCell>
                                        <TableCell align="center">Category</TableCell>
                                        <TableCell align="center">Price</TableCell>
                                        <TableCell align="center">Total Sales</TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                    products.map((product) => (
                                        <TableRow key={product._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell align="center">{product._id}</TableCell>
                                            <TableCell align="center">{product.name}</TableCell>
                                            <TableCell align="center">{product.description}</TableCell>
                                            <TableCell align="center">{product.category}</TableCell>
                                            <TableCell align="center">{product.price}</TableCell>
                                            <TableCell align="center">{product.totalSales}</TableCell>
                                            <TableCell align="center">
                                                <div className="control-box">
                                                    <button className="control-but" id={product._id} onClick={openModalEP}>Edit</button>
                                                    <Modal open={modalEP} onClose={openModalEP}>{modalEditProduct}</Modal>
                                                    <button className="control-but del" id={product._id} onClick={handleDelete}>Delete</button>
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

export default Products;
