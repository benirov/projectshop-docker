import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout'
import Card from '../components/Card'
import axiosClient from '../config/axios';

const Products = () => {

    const [products, saveProducts ] = useState([]);

    async function getProductos() {
        const resultado = await axiosClient.get('/api/products');
        saveProducts(resultado.data.products);

      }

    useEffect(() => {
        getProductos();
      }, []);
    
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    {products.length ? 
                            products.map(product => (
                                
                                <Card 
                                    key={product._id}
                                    product={product}
                                />
                            ))
                            : <p className=" text-center text-gray-600 uppercase  p-5">No hay productos aún</p>}
                </div>
            </div>
        </Layout>
      );
}
 
export default Products;