import './Cart.css'
import { useEffect, useId, useState } from "react";
import { useCart } from '../hooks/useCart';
import { useAuth } from '../context/auth';
import { CartIcon, ClearCartIcon } from "./Icons";

export function Cart(){
    const cartCheckboxId = useId()
    const [quantity, setQuantity] = useState(0)
    const { token } = useAuth()
    const { cart, addToCart, removeFromCart, cleanCart } = useCart()

    useEffect(() => {
            const totalQuantity = cart.reduce((total, producto) => total + producto.quantity, 0)
            setQuantity(totalQuantity)
        }
        ,[cart]
    )

    return(
        <>
            <label className="cart-button" htmlFor={cartCheckboxId}>
                <CartIcon />
                {quantity ? <p className='quantity-number'>{quantity}</p> : ''}
            </label>
            <input id={cartCheckboxId} type="checkbox" hidden/>
            <aside className="cart">
                <div className="cart-pointer" style={token ? {left: '140px'} : {left: '47px'}} ></div>
                <div className="cart-list">
                    <ul>
                        {cart.length === 0 ? 'El carrito esta vacío' : cart.map(product => {
                            return(
                                <li key={product.id}>
                                    <img src={product.images[0]} alt={product.title} />
                                    <div>
                                        <strong>{product.title}</strong> - ${product.price}
                                    </div>

                                    <footer>
                                        <button onClick={() => removeFromCart(product) } >-</button>
                                        <small>
                                            Cant: {product.quantity}
                                        </small>
                                        <button onClick={() => addToCart(product)}>+</button>
                                    </footer>
                                </li>
                            )                        
                        })}
                    </ul>    
                </div>
                

                <button className='clear-button' onClick={() => cleanCart()}>
                    <ClearCartIcon />
                </button>
            </aside>
        </>
    )
}