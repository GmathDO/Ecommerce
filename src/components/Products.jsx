import "./Products.css"
import { useApi } from "../context/api"
import { useCart } from "../hooks/useCart"
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons"
import { useNavigate } from "react-router"
import { successNotify } from "../hooks/useNotify"

export function Products(){

    const { filteredProducts } = useApi()
    const { cart, addToCart, removeFromCart } = useCart()
    
    const checkProductInCard = product => {
        return cart.some(item => item.id === product.id)
    }

    const navigate = useNavigate()

    return (
        <main className="products">
            <ul>
                {filteredProducts.map( product => {
                    const isProductInCart = checkProductInCard(product)

                    return(
                        <li key={product.id}>
                            <img src={product.images[0]} alt={product.title} onClick={() => navigate(`/${product.id}`)} />
                            <div className="products-title" onClick={() => navigate(`/${product.id}`)} >
                                <strong>{product.title}</strong> - ${product.price}
                            </div>
                            <div>
                                <button style={{backgroundColor: isProductInCart ? "#ff6464" : "#1a1a1a"}} onClick={
                                    () => {
                                        if(isProductInCart){
                                            removeFromCart(product)
                                            successNotify('El producto fue eliminado del carrito')
                                        } else {
                                            addToCart(product)
                                            successNotify('El producto fue añadido al carrito')
                                        }
                                    }
                                }>
                                    {
                                        isProductInCart
                                        ? <RemoveFromCartIcon />
                                        : <AddToCartIcon />
                                    }
                                </button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </main>
    )
}