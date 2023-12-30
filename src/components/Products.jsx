import { Dropdown, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setProducts(data.data);
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
    }, [refresh]);
    const hendleDelete = _id => {
        fetch(`http://localhost:5000/products/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    Swal.fire({
                        title: "Good job!",
                        text: data.message,
                        icon: "success"
                    });
                    setRefresh(!refresh)
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
    const hendleEdit = _id => {
        navigate(`/dashboard/product/edit/${_id}`)
    }

    return (
        <div className="overflow-x-auto w-full">
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Image</Table.HeadCell>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Price</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                        Actions
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        products.map(product => {
                            return (
                                <Table.Row
                                    key={product._id}
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell>
                                        <img className='w-20' src={product.image} alt="" />
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {product.name}
                                    </Table.Cell>
                                    <Table.Cell>{product.price}</Table.Cell>
                                    <Table.Cell>
                                        <Dropdown arrowIcon={false} label="Edit/Delete">
                                            <Dropdown.Item onClick={() => hendleEdit(product._id)}>Edit</Dropdown.Item>
                                            <Dropdown.Item onClick={() => hendleDelete(product._id)}>Delete</Dropdown.Item>


                                        </Dropdown>

                                    </Table.Cell>
                                </Table.Row>
                            )
                        })
                    }


                </Table.Body>
            </Table>
        </div>

    );
};

export default Products;