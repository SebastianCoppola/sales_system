import * as React from 'react';
import {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useAuth from '../../auth/useAuth';

export default function YourSalesTable({userId}) {
    const auth = useAuth();
    const [ yourSales, setYourSales ] = useState([]);
    const [ products, setProducts ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect( () => {
        fetch(`/sales/${userId}`,{
            method:'GET',
            headers:{
                'content-type': 'application/json',
                "Authorization" : `Bearer ${auth.token.token}`
            }
        })
            .then( res => res.json() )
            .then( res => {
                    setYourSales(res);
            })
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
                    setLoading(false);
            })
    },[])

    const getProductName = (id) => {
        const filteredProduct = products.filter( product => product._id === id );
        return filteredProduct[0].name;
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
                <TableContainer component={Paper} className="coins-table">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Sale Id</TableCell>
                                <TableCell align="center">Product Id</TableCell>
                                <TableCell align="center">Product Name</TableCell>
                                <TableCell align="center">Amount</TableCell>
                                <TableCell align="center">Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            yourSales.map((yourSale) => (
                                <TableRow key={yourSale._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="center">{yourSale._id}</TableCell>
                                    <TableCell align="center">{yourSale.productId}</TableCell>
                                    <TableCell align="center">{getProductName(yourSale.productId)}</TableCell>
                                    <TableCell align="center">{yourSale.amount}</TableCell>
                                    <TableCell align="center">{yourSale.price}</TableCell>
                                </TableRow>
                            ))
                        } 
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </>
    );
}

