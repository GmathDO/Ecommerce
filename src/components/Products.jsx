import "./Products.css"
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons"

export function Products({ products, cart, addToCart, removeFromCart }){

    const checkProductInCard = product => {
        return cart.some(item => item.id === product.id)
    }

    return (
        <main className="products">
            <ul>
                {products.map( product => {
                    const isProductInCart = checkProductInCard(product)

                    return(
                        <li key={product.id}>
                            <img src={product.image} alt={product.title} />
                            <div>
                                <strong>{product.title}</strong> - ${product.price}
                            </div>
                            <div>
                                <button style={{backgroundColor: isProductInCart ? "#ff6464" : "#1a1a1a"}} onClick={
                                    () => isProductInCart ? removeFromCart(product) : addToCart(product) 
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