
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dataJson from '../Data/Data.json';

const Home = () => {
    const [data , setData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5055/allProducts')
        .then(result => result.json())
        .then(data => {
            setData(data);
            console.log(data);
        })
    } ,[])
    console.log("Data =",data)
    return (

        <div style={{height:'1100px',backgroundColor:'black',margin:'0 5%'}}>
            <div className="parentDiv">
           <div className="divContainer">
             {
                 data.map( (d) => {
                     return (
                         <div style={{margin:'10px',width:'200px',height:'250px',backgroundColor:'lightGray',borderRadius:'10px'}}>
                             <img style={{width:'195px',height:'150px'}} src={d.imageUrl} alt=""/>
                             <h4>Price: ${d.price} per kg</h4>
                             <Link to={`/booking/${d._id}`}><button className="btn-primary">Book</button></Link>
                         </div>
                     )
                 })
             }
            </div>
            </div>
        </div>
    );
};

export default Home;