
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import pic from './Map.png';
import data from '../Data/Data.json';
import { UserContext } from '../../App';


const Booking = () => {
    const [loggedIUser , setLoggedInUser] = useContext(UserContext);
    const {d} = useParams();
    console.log("d=== ",d);
    const [api , setApi] = useState([]);
    const [form , setForm] = useState(true);
    useEffect(() => {
        fetch(`http://localhost:5055/product/${d}`)
           .then(result => result.json())
           .then(data => {
               console.log("BookingProduct=",data[0]);
               setApi(data[0])
           })
    } ,[])

    function addEmailAndDate(){
        const date = document.getElementById('myDate').value;
        const id = api._id;
        const email = loggedIUser.email;
        const product = {id , date , email};
        fetch(`http://localhost:5055/update/${id}`,{
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(product)
        })
        .then(res => res.json())
        .then(data => {
            console.log("Updated");
        })
    }

    return (
        <div>
            <h1>Hello I am booking</h1>
            <img style={{width:'300px',height:'300'}} src={api.imageUrl} alt=""/><br/>
            <strong>Name: </strong><span>{api.name}</span><br/>
            <strong>Price: </strong><span>${api.price}</span><br/>
            <strong>Quantity: </strong><span>1</span><br/>
            <strong>Date: </strong> <input type="date" id="myDate" name="birthday"></input><br/>
            <button className="btn-primary" onClick={addEmailAndDate} >Confirm Order</button>
        </div>
    );
};

export default Booking;