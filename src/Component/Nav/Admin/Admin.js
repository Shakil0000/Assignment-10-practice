import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const Admin = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [imageUrl , setImageUrl] = useState(null);

    const onSubmit = data => {
        const evenData = {
            name: data.name,
            price: data.price,
            imageUrl: imageUrl
        }
        console.log(evenData);
        const url = `http://localhost:5055/addEvent`;
        fetch(url, {
            method:'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(evenData)
        })
        .then(res => console.log("server side response =",res))
    };
    const handleImageUpload = event => {
        // console.log("Event == ",event.target.files[0]);
        const imageData = new FormData();
        imageData.set('key','555cd1fcaf7a00d701967609f2f30e89');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', imageData)
          .then(function (response) {
            setImageUrl(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    return (
        <div>
            Hei I am admin.
            <form onSubmit={handleSubmit(onSubmit)}>
               <strong>Name:</strong> <input name="name" defaultValue="name" ref={register} />
                <br/>
               <strong>Price :</strong> <input name="price" defaultValue="10" ref={register} />
                <br/>
              <strong>Picture:</strong>  <input name="exampleRequired" type="file" onChange={handleImageUpload}/>
                {errors.exampleRequired && <span>This field is required</span>}
                <br/>
                <input type="submit" />
             </form>
        </div>
    );
};

export default Admin;