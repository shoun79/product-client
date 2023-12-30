import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddProduct = () => {
    const navigate = useNavigate();
    const hendleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const product = {
            name: form.name.value,
            price: form.price.value,
            image: form.image.value
        };
        fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    Swal.fire({
                        title: "Good job!",
                        text: data.message,
                        icon: "success"
                    });
                    navigate('/dashboard/products')
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: data.error,
                    });
                }
            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: err.message,
                });
            })
    }
    return (
        <div className=' min-h-screen lg:py-32  w-full'>
            <form onSubmit={hendleSubmit} className='p-4 pt-10 lg:p-10 md:w-3/4 lg:w-1/2 mx-auto'>
                <div className='flex items-center'>
                    <label className='mr-4 text-right w-40' htmlFor="">Product Name:</label>
                    <input name='name' type="text" placeholder='Name' />
                </div>
                <div className='my-4 flex items-center'>
                    <label className='mr-4  text-right w-40' htmlFor="">Price:</label>
                    <input name='price' type="text" placeholder='Price' />
                </div>
                <div className='my-4 flex items-center'>
                    <label className='mr-4   text-right w-40' htmlFor="">Image:</label>
                    <input name='image' type="text" placeholder='Image URL' />
                </div>
                <div className="text-end">
                    <button className="py-3 px-8 bg-green-400 text-white font-bold">Add Product</button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;