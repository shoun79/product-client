import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`http://localhost:5000/product/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setProduct(data.data);
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
    }, [refresh, id]);

    const hendleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const product = {
            name: form.name.value,
            price: form.price.value,
            image: form.image.value
        };
        fetch(`http://localhost:5000/product/${id}`, {
            method: 'PATCH',
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
                    <input defaultValue={product?.name} name='name' type="text" placeholder='Name' />
                </div>
                <div className='my-4 flex items-center'>
                    <label className='mr-4  text-right w-40' htmlFor="">Price:</label>
                    <input defaultValue={product?.price} name='price' type="text" placeholder='Price' />
                </div>
                <div className='my-4 flex items-center'>
                    <label className='mr-4   text-right w-40' htmlFor="">Image:</label>
                    <input defaultValue={product?.image} name='image' type="text" placeholder='Image URL' />
                    <img className='w-16 ms-4' src={product?.image} alt="" />
                </div>
                <div className="text-end">
                    <button className="py-3 px-8 bg-green-400 text-white font-bold">Update Product</button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;