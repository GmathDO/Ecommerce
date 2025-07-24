import './Product.css'
import { useParams } from "react-router"
import { useApi } from "../context/api"
import { useEffect, useState } from 'react'
import { useCart } from '../hooks/useCart'
import { successNotify } from '../hooks/useNotify'
import { Helmet } from 'react-helmet'

export const Product = () => {
    const { id } = useParams()
    const [product, setProduct] = useState([])
    const { getProduct } = useApi()
    const { addToCart } = useCart()
    
    useEffect(() => {
        getProduct(id).then(res => setProduct(res))
    },[])

    return(
        <section className='product-container'>
            <Helmet>
                <title>{product.name}</title>
            </Helmet>
            <div className='product-card'>
                <img src={product.images} alt={product.title} className='product--image' />
                <div className='product--info'>
                    <p className='product--info-title' >{product.title}</p>
                    <p className='product--info-price' >${product.price}</p>
                    <div className='product--info-divisor' ></div>
                    <p className='product--info-description' >{product.description}</p>
                    <button className='product--info-button' 
                        onClick={() => {
                            addToCart(product) 
                            successNotify('El producto fue añadido al carrito')
                        }
                    }
                    >Agregar al carrito</button>
                </div>
            </div>
        </section>
    )
}